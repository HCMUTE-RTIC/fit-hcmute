# SƠ ĐỒ TUẦN TỰ ĐĂNG BÀI TIN TỨC CHUẨN SEO (SEQUENCE DIAGRAM)

Sequence Diagram dưới đây chỉ ra chi tiết luồng xử lý riêng biệt cho chức năng **Admin Đăng Bài Có Cấu Hình SEO**. Flow này đảm bảo bài viết được upload hình ảnh chuẩn, nội dung lưu trữ tối ưu hóa cấu trúc SEO và phục vụ mượt mà trên NextJS.

```mermaid
sequenceDiagram
    autonumber
    
    %% 1. Khai báo các đối tượng trong hệ thống
    actor Admin as Quản trị viên (CMS UI)
    participant NestJS as Backend API (NestJS CMS)
    participant Redis as Redis Cache
    participant DB as PostgreSQL (Prisma ORM)
    participant MinIO as MinIO S3 Bucket

    %% 2. Quá trình Tải ảnh bìa bài viết (Thumbnail)
    Note over Admin, MinIO: GIAI ĐOẠN 1: UPLOAD ẢNH BÌA
    
    Admin->>NestJS: Tải ảnh bìa (Upload Thumbnail) bằng API POST `/api/media/upload`
    NestJS->>MinIO: Streaming Upload file ảnh
    MinIO-->>NestJS: Confirm URL và File ID
    NestJS->>DB: Log vào bảng Media
    NestJS-->>Admin: Trả về Thumbnail Media URL để gắn vào Thumbnail bài
    Admin->>Admin: Preview ảnh bìa bài viết trên form CMS

    %% 3. Quá trình Nhập nội dung chuẩn SEO 
    Note over Admin, DB: GIAI ĐOẠN 2: CHỈNH SỬA BÀI VIẾT (TITLE, CONTENT, SEO META)
    
    Admin->>Admin: Viết nội dung Content qua trình soạn thảo Rich-Text (CKEditor/TinyMCE)
    Admin->>Admin: Nhập thông tin SEO Config: metaTitle, metaDescription, focusKeywords
    Admin->>Admin: Chọn Status (VD: PUBLISHED)
    
    Admin->>NestJS: POST /api/articles (Nhấn Đăng bài) 
    Note right of NestJS: JSON Payload: Title, Content, SEO Data, Thumbnail URL, category, authorId
    
    NestJS->>NestJS: Tự động generate `slug` thân thiện nếu Admin không điền <br/>(VD: ky-niem-25-nam-cntt)
    NestJS->>NestJS: Validate Data, check trùng `slug`
    
    NestJS->>DB: Insert record mới vào bảng `Article` với data truyền vào
    DB-->>NestJS: Confirm Record created
    
    %% 4. Xóa Cache Bài viết (Invalidate Cache) 
    Note over NestJS, Redis: GIAI ĐOẠN 3: PURGE CACHE ĐỂ FRONTEND NEXT.JS CẬP NHẬT TỨC THỜI
    
    NestJS->>Redis: Xóa Key Cache `/api/articles` và `/api/articles/{slug}`
    Redis-->>NestJS: OK Cleared
    
    NestJS-->>Admin: Báo cáo đăng bài thành công 201 Created (Tự động redirect tới danh sách tin bài)
```

## Các thành phần cốt lõi được triển khai trong luồng Đăng Bài (Article Flow)
- **Tách biệt Cache bằng Redis:** Khi Admin đăng 1 bài viết hoặc chỉnh sửa bài viết đã có trên DB, NestJS sẽ tự động gửi lệnh Delete Cache (`Invalidation`) trên Redis (cục bộ hoặc gửi API revalidate tới Next.js ISR) để đảm bảo Client luôn nhận được tin tức mới lập tức sau vài giây publish.
- **Auto-Generate SEO Slug:** Khi admin chỉ nhập tên bài viết, backend tự động handle logic chuẩn hóa Tiếng Việt có dấu thành `chiendich25nam` ở cấp API trước khi query insert Database, giúp URL thân thiện với Google Search.
- **Micro Storage (MinIO):** Upload ảnh Thumbnail bài viết diễn ra trước, Admin lấy link ảnh preview trước khi bấm nút Publish bài, tiết kiệm RAM Memory trên Backend thay vì post cả string article + file vào cùng 1 body req.
