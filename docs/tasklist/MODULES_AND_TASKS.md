# PHÂN RÃ NHIỆM VỤ THEO MODULES (PLANE.SO MODULES & ISSUES)

Trong Plane.so, **Modules** đại diện cho các Feature (Tính năng) hoặc System Component cốt lõi. Một Module sẽ chứa nhiều Issue (Task).

Dưới đây là danh sách phân rã toàn bộ System thành 7 Modules chính (Bao gồm Design), sắp xếp **cân bằng nguồn lực 100% cho đội ngũ 5 lập trình viên** (Mỗi người gánh xấp xỉ ~60 tiếng làm việc).

---

## 🎨 MODULE 0: UI/UX DESIGN (Thiết kế Figma)
- [ ] **TSK-001** `[FE_Public]` Thiết kế bản prototype trên Figma cho Website Public. Bám sát `DESIGN_SYSTEM.md`. (Estimate: 12h - Priority: Urgent)
    *   **Description:**
        *   Tạo Color Variables (Navy Blue, Red HCMUTE, Baby Blue Background, Gradient Hero).
        *   Tạo Typo Variables (Heading size 96px, 48px, Body 16px).
        *   Vẽ 3 màn hình Desktop, Tablet, Mobile cho: Trang Chủ, Trang Hành Trình Thời Gian, Trang Khách điền Form Submit.
        *   Vẽ các Component Core: Navbar Glassmorphism, Nút Bấm, Thẻ Card Triết lý (có icon watermark 5%).
- [ ] **TSK-002** `[FE_Admin]` Thiết kế bản prototype trên Figma cho Hệ thống CMS Admin. (Estimate: 12h - Priority: Urgent)
    *   **Description:**
        *   Vẽ Layout Admin: Sidebar bên trái, Header Topbar.
        *   Vẽ luồng tính năng: Danh sách Bài viết (Datatable), Màn Tạo/Sửa bài viết (Rich Text Editor block).
        *   Vẽ luồng tính năng Form Động: Giao diện kéo thả (Drag/Drop) thêm Field mới cho Form. Giao diện xem Danh sách người đăng ký theo từng sự kiện.

---

## 📦 MODULE 1: CORE INFRASTRUCTURE (Cơ sở hạ tầng & Base Code)
- [ ] **TSK-101** `[PM/DevOps]` Thiết lập Monorepo tĩnh, GitFlow, ESLint/Prettier. (Estimate: 6h - Priority: Urgent)
    *   **Description:**
        *   Tạo thư mục `frontend` và `backend` chung 1 Repo.
        *   Cài đặt bộ ESLint, Prettier, Husky Hook tự động format khi có người commit code. Yêu cầu clean code rác trước khi đẩy lên nhánh `develop`.
- [ ] **TSK-102** `[PM/DevOps]` Setup môi trường Docker Compose Local. (Estimate: 10h - Priority: Urgent)
    *   **Description:**
        *   Viết file `docker-compose.yml` gồm 3 services: `postgres` (port 5432), `redis` (port 6379), `minio` (mô phỏng S3 port 9000).
        *   Tạo file bash script tự khởi tạo MinIO Bucket `fit-25years-media` với policy public read.
- [ ] **TSK-103** `[BE_Core]` Khởi tạo khung NestJS & Kết nối Prisma ORM. (Estimate: 8h - Priority: High)
    *   **Description:**
        *   Khởi tạo `nest new backend`. Cài đặt Swagger để mô tả API Docs.
        *   Map toàn bộ schema từ file `docs/schema.prisma` vào code.
        *   Viết script `seed.ts` để tự động chèn 1 tài khoản Super Admin `admin@fit.hcmute` (mật khẩu Bcrypt) khi khởi động DB lần đầu.
- [ ] **TSK-104** `[FE_Public]` Khởi tạo NextJS App Router. Cài đặt Component System. (Estimate: 8h - Priority: High)
    *   **Description:**
        *   Khởi tạo `pnpm create next-app@latest frontend`. Chọn Typescript, Tailwind.
        *   Cài đặt thư viện: `framer-motion`, `lucide-react`, `magic-ui` (Shadcn-UI).
        *   Đổ mã Hex Màu từ Figma vào file `tailwind.config.js`. Tạo ra thư mục `src/components/ui/` rỗng.

---

## 📦 MODULE 2: IAM & RBAC (Phân quyền & Giám sát)
- [ ] **TSK-201** `[BE_Core]` Thiết kế Api Auth Login & Bảng User. (Estimate: 12h - Priority: Urgent)
    *   **Description:**
        *   Code API `POST /api/v1/auth/login`. Verify Hash Pass. Trả JSON Web Token (JWT) thời hạn 7 ngày.
        *   Code Middleware trích xuất JWT từ Request Header `Authorization: Bearer <token>` để nhét thông tin `user` vào `req.user`.
- [ ] **TSK-202** `[BE_Core]` Bật chặn quyền RBAC & Interceptor AuditLog (Lịch sử thao tác). (Estimate: 14h - Priority: Urgent)
    *   **Description:**
        *   Viết Guard/Decorator `@Roles('SUPER_ADMIN', 'EDITOR')` chặn API trái phép.
        *   Code TypeORM/Prisma Middleware (Interceptor). Hễ API nào gọi thao tác Edit/Delete trên bảng Article/Media, tự động bắt lấy `oldValues` và `newValues`, nhét vào bảng `AuditLog` để sau này tra cứu lại đứa nào làm hỏng hệ thống.
- [ ] **TSK-203** `[FE_Admin]` Code màn hình Login Admin & Fix Layout Sidebar rỗng. (Estimate: 8h - Priority: High)
    *   **Description:**
        *   UI Trang Đăng nhập CMS. Gắn API bẻ khoá Token, lưu vào LocalStorage/Cookie. Thiết lập Auth Guard Context trên NextJS báo lỗi nếu user vào `/admin` mà chưa login.
        *   Tạo Layout tĩnh (Chưa có tính năng): Sidebar nằm bên trái với các Menu (Bài viết, Media, Dynamic Form, Audit).
- [ ] **TSK-204** `[FE_Admin]` Thiết kế Màn hiển thị Audit Log cho SuperAdmin. (Estimate: 6h - Priority: Medium)
    *   **Description:**
        *   Gọi API GET AuditLog.
        *   Đổ dữ liệu dạng Table. Xử lý UI cột "Chi tiết Lỗi" hiển thị 2 cục JSON so sánh (Cái cũ vs Cái mới bị sửa). Table có Pagination (Phân trang). Chỉ có SUPER_ADMIN mới nhìn thấy nút Menu này trên thanh Sidebar.

---

## 📦 MODULE 3: HEADLESS CMS & NEWS SEO (Quản trị Nội dung)
- [ ] **TSK-301** `[BE_Api]` Cấu hình MinIO SDK. API Upload Media (Thư viện dùng chung). (Estimate: 12h - Priority: Urgent)
    *   **Description:**
        *   Import package `minio`. Cấu hình Provider.
        *   API `POST /api/v1/media/upload`: Nhận Buffer file, stream thẳng sang Bucket MinIO, trả về URL truy cập Public để Frontend hiển thị ngầm định.
        *   Tạo bảng `Media` dưới DB lưu thông tin tệp (kiểu `image/png`, dung lượng byte).
- [ ] **TSK-302** `[BE_Api]` API CRUD Quản lý Tin Tức, Sự kiện, Bài Báo (Article). (Estimate: 14h - Priority: Urgent)
    *   **Description:**
        *   API Sinh tự động URL thân thiện `slug` SEO (Ví dụ: `Lễ Hội 2024` -> `le-hoi-2024`) khi POST tạo bài. Chặn trùng slug.
        *   Map `authorId` lấy từ JWT Token hiện tại đính kèm vào bài báo. Gán SEO meta fields.
        *   Tích hợp Redis Caching: GET Article lấy từ Cache. Khi có Insert/Edit/Status changes, xoá Cache key cũ.
- [ ] **TSK-303** `[BE_Core]` API CMS Bộ Ảnh Kỷ niệm (Media Albums Manager). (Estimate: 10h - Priority: High)
    *   **Description:**
        *   API gom các file `Media` vào 1 bảng thư mục ảo (Ví dụ: Album `Hội thao 2018` chứa 20 Id ảnh). Tự động tạo SEO slug giống hệt mục Tin Tức để làm Trang Thư viện Ảnh SEO cho web public. Tự gán ảnh đầu tiên làm `coverPhotoId`.
- [ ] **TSK-304** `[FE_Admin]` Layout CMS: Giao diện Quản lý Bài viết & Soạn thảo tích hợp. (Estimate: 10h - Priority: Urgent)
    *   **Description:**
        *   Tạo Data table hiển thị List bài báo kèm phân trang. Nút Mở Form tạo Mới / Edit.
        *   Tích hợp bộ editor nhúng (Ví dụ: React Quill, CKEditor). Áp API TSK-301 vào nút "Chèn ảnh" trong editor để bắn file lên server trả link ghim vào ruột bài. Form gán các thẻ SEO Title/Description.
- [ ] **TSK-305** `[FE_Admin]` Màn CMS Drag & Drop Thư viện Albums Media. (Estimate: 8h - Priority: High)
    *   **Description:**
        *   Giao diện cho phép Admin tạo Nhãn Label (Tên Album). Gọi API TSK-303.
        *   Sử dụng component Dropzone cho phép Admin thả 10 ảnh 1 lúc vào Album, call Promise.all API Upload để phi tập tin.

---

## 📦 MODULE 4: DYNAMIC FORMS SYSTEM (Hệ thống Form động Cốt lõi)
- [ ] **TSK-401** `[BE_Api]` API Core Dynamic Form (Form Schema & List Submit). (Estimate: 12h - Priority: Urgent)
    *   **Description:**
        *   API POST `FormDefinition`: Input là Array Option Fields. Dùng Prisma Transaction lưu ID Form Tổng và duyệt Map Vòng lặp Save ra 5 rows `FormField` chứa loại Input Type (TEXT, RADIO...).
        *   Link khoá ngoại optional với `Article ID` (Sự kiện).
- [ ] **TSK-402** `[FE_Admin]` CMS UI: Trình tạo Form (Form Builder) & Xem/Xuất Danh sách người đăng ký Sự kiện. (Estimate: 8h - Priority: Urgent)
    *   **Description:**
        *   Màn Hình Giao diện kéo thả / Add Rule (Tạo Field Form, Bấm required). Gửi JSON Schema xuống BE API.
        *   Màn View Results: Khi Admin bấm vào 1 Sự kiện, gọi API xuất ra danh sách những ai đã submit (Đổ Table). Code Plugin tải 100% list kết quả về dạng File Download Excel (.xlsx).
- [ ] **TSK-403** `[BE_Api]` Luồng Code Handle Request Validate Dữ liệu submit từ Khách gán vào Sự kiện. (Estimate: 14h - Priority: High)
    *   **Description:**
        *   API `POST /api/v1/forms/:slug/submit`.
        *   Xử lý kiểm tra dữ liệu: Fetch `FormDefinition` từ DB lên trc, check xem field Email Khách gửi lên có phải Dạng Chuỗi Email không, Field File tải xong lên minio URL chưa. Nếu tất cả OK, nén thành `data JSONB` gán vào bảng `FormSubmission`, bắt kèm `eventId` (Article ID). Trả status `Created`.
- [ ] **TSK-404** `[FE_Public]` Code Logic NextJS Render Giao diện Vòng lặp HTML Form Form tự động trên Public Web. (Estimate: 12h - Priority: High)
    *   **Description:**
        *   Khi Khách vào sự kiện, Frontend gọi `GET` API Schema trước, xài vòng lặp tuỳ type mà đẻ ra Input Text, Select Box, Input File tương ứng (Chứa Validation Client cho Khách).
        *   Gom JSON gửi Submit. Hiện Toast Lời cảm ơn. Handle lỗi nếu API tạch.

---

## 📦 MODULE 5: PUBLIC WEB UI & MOTION (Lắp ráp Giao diện Bên ngoài)
- [ ] **TSK-501** `[FE_Public]` Homepage: Ráp Hero Banner, Navigation Bar nổi Glassmorphism và Footer. Đổ CSS chuẩn Figma. (Estimate: 10h - Priority: High)
    *   **Description:**
        *   Cắt mã HTML/CSS (Từ Figma TSK-001 hoặc Prompt TSK-Stitch).
        *   Xử lý Responsive Hamburger Menu biến đổi từ ngang sang dọc cho Điện thoại. Xử lý Blur Effect nền NavBar.
- [ ] **TSK-502** `[FE_Public]` CMS Text: Route Trang Giới Thiệu & Hiệu ứng Chạy số Số đếm Tự động (NumberTicker). (Estimate: 10h - Priority: Medium)
    *   **Description:**
        *   Trang tĩnh `about-us/`. Ráp code Grid Stats "TOP 3", "27.000+", "52" từ Figma.
        *   Áp thư viện Framer Motion/Magic UI CountUp để render hiệu ứng đếm số nhả phanh từ 0 lên 27000 đẹp mắt khi Scroll tới giữa màn hình (Intersection Observer).
- [ ] **TSK-503** `[FE_Public]` Lịch sử 25 năM: Dùng thư viện Timeline Component gán motion scroll. (Estimate: 10h - Priority: High)
    *   **Description:**
        *   Render dữ liệu Milestone từ Database. Line dọc đứng chia cắt (Dotted line). Sticky năm tháng, nội dung hiện FadeIn trồi lên từ phía dưới khi user cuộn chuột ngang / qua nó.
- [ ] **TSK-504** `[FE_Admin]` Component Public Gallery SEO: Giao diện xem thư viện ảnh mảng lưới Lighbox nhúng vào Trang Web Chính. (Estimate: 10h - Priority: Medium)
    *   **Description:**
        *   Mảng này FE_Admin làm cho lẹ vì quen luồng Album CMS. Vẽ ra Page public dạng lưới Gạch Masonry Grid Layout. Nhấp vô cái Ảnh là mở mờ Modal PopUp Phóng to xem ảnh/video mượt mà (Dùng thư viện Lightbox React tuỳ chọn). Fetch data mảng ảnh từ MinIo Url.
- [ ] **TSK-505** `[PM/DevOps]` Setup Performance Booster. Tối ưu Gzip, Caching Static Frontend Image Component. (Estimate: 12h - Priority: High)
    *   **Description:**
        *   Kích hoạt module Gzip trong Nginx server.
        *   Setting Cache TTL trên NextJs Cache (Static Rendering). Config Security Headers trên Cloudflare (Nếu server host kết xuất web qua CF). Đảm bảo chặn spam IP từ DDOS.

---

## 📦 MODULE 6: QA, DEPLOY & EMAIL WORKER (Kiểm thử, Lên Live, Job Rác)
- [ ] **TSK-601** `[PM/DevOps]` Cài và trỏ Domain cho Production Server. Thiết lập Github Actions CI/CD Pipeline Build Code Tự động. (Estimate: 16h - Priority: Urgent)
    *   **Description:**
        *   Vào hệ thống thật Ubuntu của nhà trường. Khởi tạo `pm2` / `Docker daemon`. Chạy bash script cài CSDL Prod (passwords bí mật).
        *   Code `action.yml` trên Github Repo để khi Pull Request vào nhánh `main` -> GH Action tự Build NextJS Image, SSH đẩy thẳng lên Máy chủ trường tự động up Web mới 100% Zero-Downtime. Sinh SSL (Https) Let's encrypt.
- [ ] **TSK-602** `[BE_Core]` QA Performance: Check chéo tải RAM Redis & Indexing Postgres. (Estimate: 12h - Priority: High)
    *   **Description:**
        *   Backend dò lại Schema: Gắn `@index` Prisma vào cột `Article.slug` và `Form.slug` vì hay query Where nhất. Benchmark load file lớn để set Memory Limit MinIO Container.
- [ ] **TSK-603** `[PM/DevOps]` End-to-End Checklist rà soát Bug và Bàn giao Tài liệu Hướng Dẫn Ký Nghiệm. (Estimate: 12h - Priority: Medium)
    *   **Description:**
        *   Đóng vai Khách lên Web điền form -> Có Bug không -> Đóng vai Admin Export CSV ra không -> Sắp ảnh báo lỗi không. Check 3 Role SUPER_ADMIN vs EDITOR. Log Issue nếu gãy.
        *   Viết 1 file PDF kèm ảnh Capture Màn hình cách sử dụng phần mềm chỉ cho Thầy Cô IT HCMUTE admin dùng rành rẽ.
- [ ] **TSK-604** `[BE_Api]` Thêm tính năng Push Job Queue Email (BullMQ) gởi Lời cảm ơn ngầm khi user Submit Form xong. (Estimate: 10h - Priority: Low)
    *   **Description:**
        *   Sử dụng Redis + BullMQ NestJS (Task queue).
        *   Khi Form Khách vừa ấn Submit thành công. Ko bắt chờ. NestJS ngay lập tức thả Job Gửi Mail vào túi Redis Queue. Một Worker chạy nền sẽ đớp Job, gọi NodeMailer (SMTP) bắn ra 1 luồng tin nhắn: `Cám ơn Bạn Cựu Sinh Viên ABCD Đã đồng hành cùng 25 Năm Khoa!`. Đây là tính năng ghi điểm tối đa nếu làm kịp.

---

### ⚖️ TỔNG KẾT BẢNG CÂN BẰNG TẢI TRỌNG (WORKLOAD BALANCE):
*   `[PM/DevOps]`: 6 + 10 + 12 + 16 + 12 = **56h**
*   `[BE_Core]`: 8 + 12 + 14 + 10 + 12 = **56h**
*   `[BE_Api]`: 12 + 14 + 12 + 14 + 10 = **62h**
*   `[FE_Public]`: 12(Figma) + 8 + 12 + 10 + 10 + 10 = **62h**
*   `[FE_Admin]`: 12(Figma) + 8 + 6 + 10 + 8 + 8 + 10 = **62h**

> Trung bình mỗi Lập trình viên Code/Design khoảng **~60 giờ**. Tiến độ cực kỳ dàn đều, không có Developer nào rảnh rỗi hay bị đùn việc kiệt sức. Tốn thêm công sức vẽ Figma ban đầu sẽ giúp lúc gõ Code FE (Module 3-4-5) nhanh hơn rất nhiều. Lộ trình này quá lý tưởng cho sức vóc Team Core 5 người.
