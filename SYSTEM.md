# TÀI LIỆU THÔNG TIN KHỞI TẠO DỰ ÁN (SYSTEM)
**Dự án:** Website Kỷ niệm 25 năm Khoa Công nghệ Thông tin - HCMUTE

Tài liệu này mô tả kiến trúc kỹ thuật và thông tin chức năng cốt lõi sẽ được triển khai trong hệ thống của dự án. Không áp dụng cho việc deploy code mà với mục đích cung cấp cho các lập trình viên cái nhìn tổng quan thiết kế chức năng, cấu trúc Database, logic và UI/UX.

---

## 1. Kiến trúc Công nghệ (Technology Stack)

Hệ thống được thiết kế theo kiến trúc tách biệt rõ ràng Frontend, Backend và các dịch vụ cơ sở dữ liệu.

### 1.1. Frontend (Giao diện người dùng)
*   **Core Framework:** **Next.js** (App Router)
    *   Xây dựng UI cho người dùng (Khách truy cập, Cựu sinh viên, Đối tác...)
    *   Hỗ trợ SSR / SSG để tối ưu hoá SEO, tăng tốc độ trải nghiệm web.
*   **UI/Animation Library:** **MagicUI** kết hợp **Tailwind CSS**
    *   Xây dựng thiết kế giao diện động (Animated timeline, các nút bắt mắt, hiệu ứng bốc bục, vv.)
    *   Đảm bảo yêu cầu trang trọng, ấn tượng và truyền được cảm xúc.
*   **UX/Design Rule:** Tham khảo từ cấu hình `ui-ux-pro-max` để duy trì font chữ, tone màu và cảm giác trải nghiệm xuyên suốt.

### 1.2. Backend & CMS (Hệ thống quản lý nội dung)
*   **Core Framework:** **NestJS**
    *   Phát triển API phục vụ Frontend.
    *   Tự thiết kế và xây dựng **Headless CMS** riêng phục vụ quản trị nội dung của Khoa.
*   **ORM (Kết nối Cơ sở dữ liệu):** **Prisma**
    *   Quản lý schema CSDL rõ ràng, tạo migrations an toàn và truy vấn hiệu năng cao.

### 1.3. Infrastructure & Database (Hạ tầng lưu trữ)
*   **Cơ sở dữ liệu chính:** **PostgreSQL**
    *   Lưu trữ dữ liệu: Nội dung tin tức, người dùng, Form Definition, thông tin timeline, thành tựu...
*   **Lưu trữ File Media (Storage):** **MinIO S3 (Self-hosted)**
    *   Thực hiện tạo các buckets cho lưu trữ dữ liệu tĩnh: Ảnh / Banner trang chủ, Video sự kiện, Tài liệu PDF Kỷ yếu.
*   **Caching & Queue:** **Redis**
    *   Thực hiện lưu cache tĩnh cho API, đảm bảo performance website.
    *   *(Tùy chọn)* Xử lý background queue đối với các form gửi thư đăng ký / mail cảm ơn.

### 1.4. Phân quyền & Bảo mật (RBAC)
*   **SUPER_ADMIN:** Toàn quyền hệ thống, theo dõi Audit Log (lịch sử thao tác), quản lý toàn bộ User và content.
*   **EDITOR:** Đăng bài và chỉnh sửa bài viết của mọi người. Quản lý toàn bộ thư viện Media, tạo các Bộ ảnh/Chủ đề sự kiện.
*   **AUTHOR:** Chỉ được phép viết, đăng và chỉnh sửa các bài tin tức do chính mình tạo ra.

### 1.5. Giám sát hệ thống (Audit Logging)
*   Mọi thao tác thay đổi dữ liệu (Thêm, Sửa, Xóa) quan trọng từ phía CMS đều được tự động lưu dấu vết (Ai làm, IP nào, đổi dữ liệu gì, vào lúc nào).
*   Tính năng xem lịch sử hệ thống (Audit Trail) bị giới hạn, **chỉ SUPER_ADMIN mới được phép truy cập**.

---

## 2. Cấu trúc Chức năng Website

Website hướng ra công chúng bao gồm 6 section / trang thông tin cốt lõi:

### 2.1. Trang chủ (Home)
*   **Chức năng:** Nơi "First impression" thu hút và điều hướng.
*   **Nội dung cốt lõi:**
    *   Hero Section nổi bật chứa định dạng Video hoặc Animation truyền tải thông điệp chính "25 năm 1 chặng đường".
    *   Call-to-Action (CTA): Nút Đăng ký tham dự nổi bật, truy cập nhanh lịch trình.
    *   Tóm tắt sơ bộ các sự kiện chính sắp diễn ra.

### 2.2. Giới thiệu (About Us)
*   **Chức năng:** Tạo chiều sâu thông tin lịch sử của Khoa.
*   **Nội dung cốt lõi:**
    *   Tổng quan Lịch sử Khoa (các ban lãnh đạo, cán bộ đời đầu).
    *   Sứ mệnh, Tầm nhìn & Giá trị cốt lõi.
    *   **"Các con số biết nói":** Section chứa CountUp animation cho số lượng sinh viên ra trường, số bài báo, giải thưởng...

### 2.3. Hành trình 25 năm (Timeline)
*   **Chức năng:** Kể chuyện dựa theo mốc thời gian.
*   **Nội dung cốt lõi:**
    *   Sử dụng UI Timeline tương tác (Vertical hoặc cuộn ngang).
    *   Mỗi cột mốc/thập kỷ sẽ là tổ hợp chữ, tranh ảnh đại diện, gắn với từng thành tựu hay khoảnh khắc tương ứng.

### 2.4. Tin tức & Sự kiện (News & Events)
*   **Chức năng:** Kênh truyền thông cập nhật liên tục thông tin cho lễ.
*   **Nội dung cốt lõi:**
    *   Hệ thống bài viết tin tức.
    *   Hỗ trợ lọc (Filter) bài viết theo chủ đề: Sự kiện học thuật, Các phong trào hội thao, Cuộc thi học thuật, hay Chuỗi hội thảo chuyên đề.

### 2.5. Thành tựu (Achievements)
*   **Chức năng:** Nơi thể hiện sự tự hào về thành tích nổi bật của Khoa CNTT.
*   **Nội dung cốt lõi:**
    *   Đào tạo & Nghiên cứu Khoa học (Sản phẩm nổi bật, báo cáo hội nghị).
    *   Hợp tác trong & ngoài nước.
    *   **Gương mặt Cựu Sinh viên Tiêu biểu:** Section chứa card giới thiệu các doanh nhân, chuyên gia cựu học sinh.

### 2.6. Tri ân & Kết nối (Alumni & Network)
*   **Chức năng:** Nơi tương tác 2 chiều giữa nhà trường và cộng đồng.
*   **Nội dung cốt lõi & Technical Note:**
    *   Form đăng ký hội quân và tham gia lễ lớn.
    *   Khu vực gửi Lời chúc 25 năm, đóng góp / tài trợ.
    *   Tải xuống phiên bản Kỷ yếu điện tử (PDF file).
*   **🌟 Đặc tả Kỹ thuật (Dynamic CMS Form):** 
    *   Vì Khoa có thể tổ chức nhiều sự kiện khác trong chuỗi 25 năm, module form trong **CMS NestJS phải được thiết kế linh hoạt (Dynamic Form)**.
    *   Admin CMS có thể tạo 1 Form tri ân/Đăng ký mới dành cho *"Sự kiện A"*, trong đó tự quy định Form gồm *"Trường Lời chúc (Textarea)"* hoặc *"Trường số sinh viên đi cùng (Number)"*. API của NestJS + Postgres (sử dụng Prisma JSON field type) phải lưu trữ được tuỳ chỉnh Form Definition này.

### 2.7. Thư viện Kỷ niệm (Media Gallery)
*   **Chức năng:** Tổ chức hình ảnh và video sự kiện quy mô lớn qua 25 năm.
*   **Nội dung cốt lõi:**
    *   Hình ảnh và Video được cấu trúc thành các **Giai đoạn/Chủ đề (Albums)** (Ví dụ: "Lễ hội ẩm thực 2015", "Hội thảo AI 2024").
    *   Các Album có cơ chế **chuẩn SEO** (Slug, Meta Title/Description) riêng để Google Index hình ảnh dễ dàng.
*   **Technical Note:** Chỉ roles **SUPER_ADMIN** và **EDITOR** mới được quyền thiết lập cấu trúc Album/Chủ đề này. Giao diện Frontend Next.js sẽ ứng dụng thư viện dạng lưới linh hoạt (Masonry Grid hoặc Lightbox) tái hiện cảm giác hoài niệm.
