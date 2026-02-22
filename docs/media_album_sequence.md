# SƠ ĐỒ TUẦN TỰ THƯ VIỆN ẢNH VÀ AUDIT LOG (SEQUENCE DIAGRAM)

Biểu đồ này minh hoạ quá trình Editor tạo một Bộ thư viện ảnh/chủ đề sự kiện (Media Album), thiết lập chuẩn SEO và upload hàng loạt ảnh. Đồng thời, sơ đồ thể hiện ngầm hệ thống NestJS tự bắt log (Audit Logging) và lưu vết cho Super Admin kiểm soát.

```mermaid
sequenceDiagram
    autonumber
    
    %% Khai báo các đối tượng
    actor Editor as User (Level: EDITOR)
    participant NestJS as Backend API (NestJS CMS)
    participant DB as PostgreSQL
    participant MinIO as MinIO S3 Server
    actor SuperAdmin as User (Level: SUPER_ADMIN)

    %% Giai đoạn 1: Tạo cấu trúc Chủ đề Albums
    Note over Editor, DB: 1. EDITOR TẠO BỘ ẢNH (ALBUM) CÓ HỖ TRỢ SEO
    
    Editor->>NestJS: POST `/api/albums` (Body: Title, Description, metaTitle, metaDescription)
    Note right of NestJS: Middleware Check Role <br/> Chỉ SUPER_ADMIN / EDITOR hợp lệ
    
    NestJS->>DB: Check Role Valid > Insert tạo mới `MediaAlbum` (kèm SEO config)
    DB-->>NestJS: Confirm Album Created
    
    %% CƠ CHẾ AUDIT LOGGING CHẠY NGẦM
    NestJS--)DB: (Async Interceptor) Ghi log thao tác vào bảng `AuditLog`
    Note over NestJS, DB: Log Detail: Thao tác CREATE bảng `MediaAlbum` bởi userId (Editor)
    
    NestJS-->>Editor: Response: Success Album ID

    %% Giai đoạn 2: Tải lên hàng loạt ảnh sự kiện vào Album
    Note over Editor, MinIO: 2. EDITOR TIẾN HÀNH UPLOAD NHIỀU ẢNH VÀO ALBUM
    
    Editor->>NestJS: POST `/api/media/upload-batch` (FormData: files array + albumId)
    
    loop Đối với từng file trong array
        NestJS->>MinIO: Streaming stream file data lên Bucket
        MinIO-->>NestJS: Upload OK, Return MinIO Path
        NestJS->>DB: Lưu các URL vào bảng `Media` (gắn khoá ngoại `albumId`)
    end
    
    NestJS--)DB: (Async) Ghi lại `AuditLog`: Action BATCH_CREATE bảng `Media`
    NestJS-->>Editor: Upload success: Progress 100%

    %% Giai đoạn 3: Super Admin giám sát hệ thống
    Note over SuperAdmin, DB: 3. SUPER ADMIN GIÁM SÁT HỆ THỐNG
    
    SuperAdmin->>NestJS: GET `/api/audit-logs` (View Audit Trails)
    Note left of NestJS: Middleware Check Role <br/> Yêu cầu bắt buộc role: SUPER_ADMIN
    
    NestJS->>DB: Query bảng `AuditLog` kèm thông tin User (Join table)
    DB-->>NestJS: Trả Array list các Logging History
    NestJS-->>SuperAdmin: Render Table danh sách: Ai xoá bài, Ai sửa form, Ai up ảnh trái phép (nếu có)...
```

## Các điểm thiết kế hệ thống đáng giá:
1. **RBAC Middleware (Phân quyền):** NestJS Guard Role-Based Access Control kiểm soát chặn đứng nếu một Author lấy token API để tự tạo Album sự kiện (HTTP 403 Forbidden).
2. **Audit Interceptor (Lưu vết không xâm lấn Code main logic):** Logic lưu log `AuditLog` được đặt ở Interceptor hoặc Prisma Middleware. Cứ có query thay đổi DB thì DB Listener tự bắt được Request IP, Auth ID và diff JSON Data để ném vào bảng `AuditLog` một cách bất đồng bộ (`Async`), **không làm chậm thời gian chờ phản hồi của API Editor**.
3. **Batch Upload Streamer:** Tích hợp trực tiếp MinIO qua stream, không lưu file tạm (temp file) trên đĩa cứng của server giúp bảo đảm máy chủ backend không bị nghẽn ổ đĩa Cấu hình.
