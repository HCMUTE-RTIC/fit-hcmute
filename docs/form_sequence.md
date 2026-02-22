# SƠ ĐỒ TUẦN TỰ LƯU TRỮ VÀ XỬ LÝ DYNAMIC FORM (SEQUENCE DIAGRAM)

Sequence Diagram dưới đây chỉ ra chi tiết luồng Request/Response chuẩn trong hệ thống tính từ lúc Client load giao diện, User điền thông tin form và upload hình (nếu có), cho đến khi Backend NestJS lưu trữ data một cách đồng bộ xuống Database.

```mermaid
sequenceDiagram
    autonumber
    
    %% 1. Khai báo các đối tượng trong hệ thống
    actor User as Khách / Cựu Sinh Viên (Browser/Mobile)
    participant NextJS as Frontend Next.js (Client UI)
    participant NestJS as Backend API (NestJS CMS)
    participant DB as PostgreSQL (Prisma ORM)
    participant MinIO as Đầu ghi Media (MinIO S3 Bucket)

    %% 2. Quá trình người dùng yêu cầu xem sự kiện và hiển thị Form Dynamic
    Note over User, NextJS: TRẠNG THÁI 1: HIỂN THỊ CẤU TRÚC FORM ĐỘNG
    
    User->>NextJS: Truy cập vào link Trang Chủ / Sự kiện: "Gửi lời tri ân"
    NextJS->>NestJS: Gửi Request GET `/api/forms/{form-slug}` (Ví dụ form-slug: "loi-chuc-25-nam")
    
    NestJS->>DB: Query bảng `FormDefinition` join `FormField` bằng `slug`
    DB-->>NestJS: OK. Trả về thông tin Form (Title, Active state..) kèm Danh sách các trường nhập (Field: Name, Type, Required)
    
    NestJS-->>NextJS: Response cấu hình form dưới dạng JSON Mảng cấu trúc
    NextJS->>NextJS: Xử lý Client side. Parse mảng JSON Field Data mapping thành React/MagicUI Form Components.
    NextJS-->>User: Giao diện Form được render ra màn hình.
    
    %% 3. Quá trình chọn file chứng minh / hình ảnh kỉ yếu
    Note over User, MinIO: TRẠNG THÁI 2: ĐÍNH KÈM TÀI LIỆU MEDIA (IF ANY)
    
    opt Nếu Form có trường loại FILE/IMAGE (Ví dụ tải ảnh cá nhân thời đi học)
        User->>NextJS: User tương tác chọn thao tác Upload + Xác nhận preview
        NextJS->>NestJS: Axios POST `/api/media/upload` (Content-Type: multipart/form-data)
        
        Note right of NestJS: Backend kiểm tra định dạng MIME, kích thước giới hạn (File Interceptor)
        NestJS->>MinIO: Steam dữ liệu file buffer qua SDK lên Bucket (PutObject)
        MinIO-->>NestJS: Upload OK. Trả lại External URL và Bucket Key ID
        
        NestJS->>DB: Ghi log URL ảnh vào bảng `Media`
        DB-->>NestJS: Trả vể mediaRecord { id }
        NestJS-->>NextJS: Response Success { mediaUrl, mediaId }
        
        NextJS->>NextJS: Gắn file `mediaUrl` thu được vào giá trị text trên form UI
    end

    %% 4. Quá trình Review và Submit Data 
    Note over User, DB: TRẠNG THÁI 3: KIỂM TRA & LƯU CHỮ LƯỢNG DATA VÀO DATABASE
    
    User->>NextJS: User kiểm tra kỹ nhập đủ họ tên, lời chúc, năm học -> Nhấn nút SUBMIT FORM
    NextJS->>NextJS: Gom toàn bộ dữ liệu field thành 1 cục Object (VD: { full_name: "A", year: "2010", message: "Chúc..." })
    
    NextJS->>NestJS: Gửi data qua API: POST `/api/forms/{slug}/submit` + BodyData Json
    
    %% Logical Backend side:
    Note right of NestJS: NestJS Middleware lấy Definition Schema từ DB để Validate <br/> (Check tính đúng kiểu type string, email, null check...) 
    
    NestJS->>DB: Query Prisma: Insert record mới vào bảng `FormSubmission` (Lưu Object body vào Data JSON type, nối với Khóa ngoại `formId`)
    DB-->>NestJS: Confirm OK, Row Affected
    
    NestJS-->>NextJS: Trả về trạng thái HTTP 201 Created Status
    NextJS-->>User: Đóng Form và Hiển thị Modal/Toast Message 100%: "Gửi thành công! Cám ơn bạn đã quan tâm chương trình 25 năm..."
    
    %% 5. Quá trình Admin quản lý và Xuất File Excel (Tính năng mới)
    Note over User, DB: TRẠNG THÁI 4: CMS ADMIN TRUY XUẤT VÀ TẢI FILE EXCEL DATA (EXPORT)
    
    actor Admin as Quản trị viên (CMS)
    Admin->>NextJS: Truy cập trang Quản lý Bài viết / Sự kiện, nhấn nút "Xuất CSV/Excel Form"
    NextJS->>NestJS: Gửi Request GET `/api/forms/{slug}/export?eventId=xxx`
    NestJS->>DB: Query bảng `FormSubmission` lọc theo `eventId`
    DB-->>NestJS: Trả về mảng JSON chứa hàng ngàn records đăng ký
    
    Note right of NestJS: Backend thực hiện biến đổi (Parse) <br/> mảng JSON Object thành cấu trúc Flat (2D Array)
    NestJS->>NestJS: Stream Parse 2D Array sang định dạng `.csv` hoặc `.xlsx` (Dùng thư viện xml2js, exceljs...)
    
    NestJS-->>NextJS: Trả về Binary File Download Header (Content-Disposition: attachment)
    NextJS-->>Admin: Trình duyệt tự tải xuống thư mục máy tính file `danh-sach-su-kien.xlsx`
```

## Các thành phần cốt lõi được triển khai trong luồng
- **Type Checking Dynamically:** Backend NestJS không hardcode các trường (họ tên, email). Việc Validate nằm việc map thông số `type` và `required` lấy từ `FormField` dưới DataBase thay vì Class Validator truyền thống của NestJS.
- **Micro Storage Layer Context:** Hệ thống Upload (MinIO S3) được bóc tách hoàn toàn độc lập với form submit. File tải lên trước, Backend nhận link sau đó chèn link URL vào Form JSON data, cuối cùng mới submit JSON data thành record cuối, đảm bảo không rớt dữ liệu văn bản nếu ảnh load quá nặng.
- **Client Render (NextJS):** Component form của NextJS sử dụng kỹ thuật Render Engine động đọc config JSON và vòng lặp `map()` hiển thị component Input, Select hay Checkbox có sẵn của hệ thống UI mà không cần can thiệp code cứng.
- **Stream Excel Pipeline:** Thay vì để Frontend tải một cục JSON vài Megabytes về rồi mới xuất Excel làm treo trình duyệt Máy tính của Admin, luồng hiện tại đẩy toàn bộ gánh nặng Parse `JSON` -> `Excel` cho CPU của NestJS Backend và stream file nhị phân về.
