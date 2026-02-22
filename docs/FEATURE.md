# TÀI LIỆU DANH SÁCH TÍNH NĂNG VÀ LUỒNG XỬ LÝ (FEATURES & FLOWS)

Tài liệu này tổng hợp toàn bộ các tính năng lớn (Features) của ứng dụng Frontend/Backend và các luồng đi cốt lõi (User Flows) của người dùng ở từng phân hệ.

---

## PHẦN A. CÁC TÍNH NĂNG DÀNH CHO NGƯỜI DÙNG (GUEST / ALUMNI)

### 1. Xem Thông Điệp Kỷ Niệm 25 Năm (Trang Chủ)
*   **Mô tả:** Người dùng khi vào website sẽ thấy ngay không khí sự kiện qua Hero Section ấn tượng, với background video/hình ảnh liên quan.
*   **Flow (Luồng xử lý):**
    1. User truy cập domain trang chủ.
    2. NextJS load nội dung bao gồm Video Banner và các sự kiện sắp hiện hữu.
    3. User tương tác nhấn chữ "Đăng ký tham dự" (CTA).
    4. Trình duyệt tự động chuyển hướng (Scroll hoặc Navigate) tới thẳng Form của Sự Kiện Kỷ niệm 25 năm chính thức.

### 2. Xem Cột Mốc Thời Gian (Timeline 25 Năm)
*   **Mô tả:** Sử dụng giao diện UI cuộn tương tác để tái hiện 25 năm thành lập Khoa CNTT.
*   **Flow:**
    1. User truy cập tab/phần "Hành trình 25 năm".
    2. Frontend sẽ fetch danh sách các mốc thời gian (Milestone) từ API: `GET /api/milestones` với cấu hình sắp xếp (Order) ưu tiên.
    3. User cuộn màn hình, mỗi lần scroll tới cột mốc nào thì màn hình xuất hiện các effect animation.

### 3. Xem "Các Con Số Biết Nói" & Thành Tựu
*   **Mô tả:** Trang tổng hợp các con số đào tạo, nghiên cứu bằng hiệu ứng nhảy số (Counter).
*   **Flow:**
    1. User chọn mục "Giá trị cốt lõi / Giới thiệu".
    2. API Backend trả về tập tin JSON chứa array các chỉ số (`metrics` trong bảng `Achievement`).
    3. Animation Count-Up khởi chạy để tăng dần các con số trên màn hình.

### 4. Gửi Lời Chúc Mừng & Đăng Ký Khách Mời (Dynamic Form)
*   **Mô tả:** Nơi để các Cựu sinh viên, cựu giáo chức và khách mời gắn kết gửi lời chúc hoặc xác nhận tham dự lễ kỷ niệm.
*   **Flow:**
    1. User bấm vào mục Liên hệ / Gửi lời chúc.
    2. Next.js lấy định nghĩa chi tiết của form: `GET /api/forms/loi-chuc-25-nam`. Backend sẽ trả về Form này yêu cầu user điền những input gì (Ví dụ: Họ tên, Email, Khóa, Lời bình luận).
    3. User điền form. Bấm nút Submit.
    4. Client side gom toàn bộ biến input thành Object JSON và post qua `POST /api/forms/loi-chuc-25-nam/submit`. 
    5. Backend bóc tách data, chặn Validation và ghi Json đè vào CSDL Postgres. User nhìn thấy pop-up Cám ơn!

### 5. Khám Phá Thư Viện Hình Ảnh (Media Web Gallery)
*   **Mô tả:** Cuốn Albums Ký ức về các sự kiện quy mô lớn trong suốt lịch sử.
*   **Flow:**
    1. User truy cập "Thư viện Số". Frontend load danh sách các Giai đoạn / Bộ Ảnh (Albums) (VD: IT_Festival_2020).
    2. User nhấn vào 1 Album -> Chuyển hướng tới trang chi tiết với URL chuẩn SEO: `/thuvienanh/it-festival-2020`.
    3. Trình duyệt hiển thị lưới xem ảnh (Lightbox).
    4. (Optional) User nhấn tải xuống Kỷ yếu dưới dạng PDF file.

---

## PHẦN B. CÁC TÍNH NĂNG QUẢN TRỊ (HEADLESS CMS ADMIN)

### 6. Quản Lý Tin Tức Sự Kiện Tối Ưu SEO (Module Article)
*   **Phân quyền:** SUPER_ADMIN, EDITOR, AUTHOR.
*   **Mô tả:** Tính năng soạn thảo, quản trị nội dung bài báo, bản tin sự kiện. Tự động hỗ trợ các cấu hình SEO, tự lấy slug thông minh.
*   **Flow đăng bài (Author/Editor):**
    1. Admin đăng nhập vào trang CMS. Đi tới "Đăng bài mới".
    2. Nhập Tiêu đề bài viết. Backend tự động sinh mã Slug tiếng việt không dấu. (VD: "Thi IT 2025" -> `thi-it-2025`).
    3. Up Thumbnail: Client upload File qua `POST /api/media`. Nhận về URL để gắn vào giao diện nháp.
    4. Nhập SEO Tags (Title, Description, Keyword).
    5. Bấm Publish `POST /api/articles`. Backend lưu DB dựa vào AuthorID tương ứng -> Xoá Cache ở Redis. Hệ thống public bài viết ngay lập tức trên trang chủ.
*   **Flow Phân Quyền Giới Hạn Bài (RBAC check):**
    - Nếu User là **AUTHOR**: CMS chỉ fetch list bài viết thoả điều kiện `authorId == User.ID`. Họ chỉ thấy và sửa bài của mình.
    - Nếu User là **EDITOR / SUPER_ADMIN**: CMS load toàn bộ bài trong Database, cho phép sửa bất cứ bài của ai.

### 7. Quản lý Thư viện Media & Các Bộ Ảnh Sự Kiện (Module Albums)
*   **Phân quyền:** SUPER_ADMIN, EDITOR.
*   **Mô tả:** Cập nhật, tạo mới các kho ảnh theo năm tháng cho thư viện ảnh. Cho phép gắn các từ khoá (Tags SEO) riêng cho từng Bộ ảnh.
*   **Flow:**
    1. Admin cấp EDITOR gọi API tạo Album: `POST /api/albums` với các metaTitle, metaDescription SEO.
    2. Backend trả về Album OK.
    3. Giao diện Mở tuỳ chọn Kéo thả (Drag&Drop) Hình ảnh. 
    4. Admin ném vào 50 tấm ảnh. CMS tiến hành batch upload liên tục từng tấm ảnh trực tiếp bằng Stream Protocol lên MinIO. 
    5. Các link file Minio sinh ra được nhúng ngay lập tức để nối với ID Album đó vào database postgresql (table Media).

### 8. Quản Lý Hệ Thống Form Động (Dynamic Form Control)
*   **Phân quyền:** SUPER_ADMIN.
*   **Mô tả:** Cung cấp giải pháp tuỳ chỉnh form tri ân từ bảng quản trị CMS cực kì linh hoạt mà không cần phải can thiệp hay chờ Deploy code lại từ Developer.
*   **Flow:**
    1. Admin vào tab CMS Forms -> Bấm tạo mới `FormDefinition`.
    2. Điền form slug: `toạ-dam-doanh-nghiep-2024`.
    3. Thêm các `FormField`. VD: "Tên công ty" (loại TEXT, Required), "Bạn mang bao nhiêu khách mời?" (Loại SELECT, Data mảng: ['1', '2-5', '>5'] ).
    4. Backend ghi Config này vào Schema cơ sở dữ liệu. Next.js đọc từ API và vẽ thành GUI HTML chuẩn xác như ý Admin.
    5. Dashboard hiển thị Data Table các lượt khách nộp vào JSON Submission giúp nhà Trường dễ xuất file Excel.

### 9. Giám Sát Lịch Sử Hệ Thống (Audit Logging Viewer)
*   **Phân quyền:** Duy nhất hệ Super Admin (SUPER_ADMIN)
*   **Mô tả:** Chức năng đọc lại nhật ký làm việc để kiểm toán hoặc xác định trách nhiệm lỗi xoá/sửa dữ liệu ở CMS.
*   **Flow:**
    1. Bất kỳ khi EDITOR hay AUTHOR cập nhật Bài viết, Sửa ảnh, hệ thống NestJS đều âm thầm tạo log (Audit Entry) chạy nền async lưu vào table `AuditLogs` kèm old/new Object Values.
    2. SupeAdmin ở Bảng điều khiển nhấn vào "Lịch sử Hệ Thống". 
    3. Giao diện CMS request `GET /api/audit-logs`.
    4. SuperAdmin có thể Sort (lọc) theo "Ai đã thực hiện thay đổi vào ngày hôm qua" hay "Xem chi tiết bạn A đã xoá bài viết Tin tức C của Giảng viên B".
