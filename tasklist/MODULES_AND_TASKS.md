# PHÂN RÃ NHIỆM VỤ THEO MODULES (PLANE.SO MODULES & ISSUES)

Trong Plane.so, **Modules** đại diện cho các Feature (Tính năng) hoặc System Component cốt lõi. Một Module sẽ chứa nhiều Issue (Task).

Dưới đây là danh sách phân rã toàn bộ System thành 5 Modules chính, kèm theo các Task Detail và gán người chịu trách nhiệm (Assignee).

---

## 📦 MODULE 1: CORE INFRASTRUCTURE & DevOps
*Mô tả: Hạ tầng server, Base Code, CI/CD và kết nối Database.*

- [ ] **TSK-101** `[PM/DevOps]` Thiết lập Monorepo (hoặc 2 repo FE/BE). Lên Rule ESLint/Prettier chuẩn và GitFlow chia nhánh. (Estimate: 4h - Priority: Urgent)
- [ ] **TSK-102** `[PM/DevOps]` Dựng cấu hình Docker Compose cho Postgres, Redis, MinIO S3 tạo sẵn buckets. Config kết nối Nginx dự phòng. (Estimate: 8h - Priority: Urgent)
- [ ] **TSK-103** `[BE_Core]` Khởi tạo khung NestJS. Kết nối Prisma ORM. Tạo Script tự động Seed tài khoản `SUPER_ADMIN`. (Estimate: 6h - Priority: High)
- [ ] **TSK-104** `[FE_Motion]` Khởi tạo NextJS App Router. Cài đặt TailwindCSS, Next/Font và setup Theme chuẩn `DESIGN_SYSTEM.md`. (Estimate: 6h - Priority: High)

---

## 📦 MODULE 2: IAM & RBAC (Identity & Access Management)
*Mô tả: Hệ thống xác thực và phân quyền cho CMS Admin (Tài khoản người dùng, Phân quyền thao tác, Audit Log).*

- [ ] **TSK-201** `[BE_Core]` Thiết kế bảng `User` & `AuditLog` trên Prisma. Code Module Auth (Login JWT Token, Validate Password). (Estimate: 12h - Priority: Urgent)
- [ ] **TSK-202** `[BE_Core]` Bật RBAC Guard chặn Quyền. Viết Global Interceptor để tự động Capture lưu vào `AuditLog` khi có ai đó Create/Update/Delete DB. (Estimate: 16h - Priority: Urgent)
- [ ] **TSK-203** `[FE_Admin]` Code màn hình Login Admin. Xử lý lưu AccessToken JWT. Dựng Khung Layout CMS Dashboard (Sidebar, Header log out). (Estimate: 12h - Priority: High)
- [ ] **TSK-204** `[FE_Admin]` Code màn hình Quản trị "Lịch sử Hệ Thống" (Chỉ hiện cho Super Admin xem AuditLog). (Estimate: 8h - Priority: Medium)

---

## 📦 MODULE 3: HEADLESS CMS & NEWS SEO
*Mô tả: Mảng quản trị nội dung tĩnh, trang bài báo, quản lý tệp tin Media và Thư viện ảnh sự kiện.*

- [ ] **TSK-301** `[BE_Api]` Cấu hình MinIO SDK. Viết API `POST /api/media/upload` (Up ảnh lẻ) và `upload-batch` (Up lưới ảnh Album). Trả về URL public. (Estimate: 16h - Priority: Urgent)
- [ ] **TSK-302** `[BE_Api]` Thiết kế API Articles CRUD. Hỗ trợ logic tự sinh SEO Slug, Map thông tin `authorId`. Cấu hình xoá Cache Redis ngay khi Insert Thành công. (Estimate: 16h - Priority: Urgent)
- [ ] **TSK-303** `[BE_Api]` Thiết kế API Quản trị Bộ Ảnh Sự Kiện (Albums). (Estimate: 8h - Priority: High)
- [ ] **TSK-304** `[FE_Admin]` Làm CMS: Trang danh sách Bài viết, Màn hình Soạn thảo tích hợp Rich Text Editor (CKEditor) và Form gắn cấu hình Meta SEO. (Estimate: 20h - Priority: Urgent)
- [ ] **TSK-305** `[FE_Admin]` Làm CMS: Trang Gallery Quản lý Album, giao diện Drag & Drop Batch Upload Media. (Estimate: 16h - Priority: High)

---

## 📦 MODULE 4: DYNAMIC FORMS SYSTEM
*Mô tả: Tâm điểm của tính năng kỹ thuật "Tri ân & Kết nối" cho phép tuỳ biến trường nhập liệu từ Admin Dashboard.*

- [ ] **TSK-401** `[BE_Api]` Thiết kế Prisma Schema cho `FormDefinition`, `FormField` và `FormSubmission` JSON storage. Viết API trả ra List Schema (cho frontend render) và API Get List cho CMS. (Estimate: 14h - Priority: Urgent)
- [ ] **TSK-402** `[FE_Admin]` Code giao diện Tạo Form Tùy Biến (CMS). Phép kéo vào thêm các Data Type (Text, Number, Email). Gửi JSON schema về backend. Màn hình Tracking File Excel Data Khách. (Estimate: 20h - Priority: Urgent)
- [ ] **TSK-403** `[BE_Api]` Core Validate Data Submit Động. Đọc field Schema check `required/type` rồi insert Prisma JSON type. Kích hoạt Email Auto-reply xác nhận ghi danh. (Estimate: 16h - Priority: High)
- [ ] **TSK-404** `[FE_Motion]` Phát triển UI Trang Submit Của Khách. Sử dụng NextJS đọc Schema API, render vòng lặp tạo ra GUI Form. Post Payload JSON về server. (Estimate: 16h - Priority: High)

---

## 📦 MODULE 5: PUBLIC WEBSITE CLIENT & MOTION UX
*Mô tả: Toàn bộ bề mặt hiển thị ra ngoài cho Khách/Sinh viên truy cập. Bao trọn Animation và SEO Layout.*

- [ ] **TSK-501** `[FE_Motion]` Trang Chủ: Code Hero Banner Kỷ niệm, Motion Intro. Ráp Header/Footer floating. (Estimate: 16h - Priority: High)
- [ ] **TSK-502** `[FE_Motion]` Trang Giới Thiệu Khoa: Code Animation số đếm (Counter). Chèn thông tin Tĩnh (Sứ mệnh, Ban lãnh đạo). (Estimate: 10h - Priority: Medium)
- [ ] **TSK-503** `[FE_Motion]` Trang Hành Trình 25 Tuổi: Dùng Framer Motion hoặc MagicUI code Scroll Timeline tương tác dọc. Lấy danh sách cột mốc. (Estimate: 20h - Priority: High)
- [ ] **TSK-504** `[FE_Motion]` Trang Tin Tức/Thành Tựu: Lấy data API có Redis Cache. Giao diện Masonry Layout cho Thư viện Album Hình ảnh sự kiện thời xưa. Code Pagination. (Estimate: 16h - Priority: Medium)
- [ ] **TSK-505** `[FE_Motion]` Tối ưu Tốc Độ SEO (Next/Image, Next/Font). Khử mã JS thừa, config Nginx Gzip để điểm số Lighthouse > 90. Cấu hình WAF Cloudflare bảo mật DNS. (Estimate: 12h - Priority: High)
