# PHÂN RÃ NHIỆM VỤ THEO MODULES (PLANE.SO MODULES & ISSUES)

Trong Plane.so, **Modules** đại diện cho các Feature (Tính năng) hoặc System Component cốt lõi. Một Module sẽ chứa nhiều Issue (Task).

Dưới đây là danh sách phân rã toàn bộ System thành 7 Modules chính (Bao gồm Design), sắp xếp **cân bằng nguồn lực 100% cho đội ngũ 5 lập trình viên** (Mỗi người gánh xấp xỉ ~60 tiếng làm việc).

---

## 🎨 MODULE 0: UI/UX DESIGN (Thiết kế Figma)
- [ ] **TSK-001** `[FE_Public]` Thiết kế bản prototype trên Figma cho Website Public (Trang Chủ, Hành Trình, Form). Bám sát `DESIGN_SYSTEM.md`. (Estimate: 12h - Priority: Urgent)
- [ ] **TSK-002** `[FE_Admin]` Thiết kế bản prototype trên Figma cho Hệ thống CMS Admin (Dashboard, List Bài, Trình tạo Form Động). (Estimate: 12h - Priority: Urgent)

---

## 📦 MODULE 1: CORE INFRASTRUCTURE (Cơ sở hạ tầng & Base Code)
- [ ] **TSK-101** `[PM/DevOps]` Thiết lập Monorepo. Lên Rule ESLint/Prettier chuẩn và GitFlow chia nhánh. (Estimate: 6h - Priority: Urgent)
- [ ] **TSK-102** `[PM/DevOps]` Dựng cấu hình Docker Compose cho Postgres, Redis, MinIO S3 tạo sẵn buckets. Setup file biến môi trường đính kèm Nginx. (Estimate: 10h - Priority: Urgent)
- [ ] **TSK-103** `[BE_Core]` Khởi tạo khung NestJS. Kết nối Prisma ORM. Tạo Script tự động Seed tài khoản Admin. (Estimate: 8h - Priority: High)
- [ ] **TSK-104** `[FE_Public]` Khởi tạo NextJS App Router. Cài đặt TailwindCSS, cấu hình Font và màu theo `DESIGN_SYSTEM.md`. (Estimate: 8h - Priority: High)

---

## 📦 MODULE 2: IAM & RBAC (Phân quyền & Giám sát)
- [ ] **TSK-201** `[BE_Core]` Thiết kế bảng `User`. Code logic Auth (Login JWT Token, Validate Password / Hash Bcrypt). (Estimate: 12h - Priority: Urgent)
- [ ] **TSK-202** `[BE_Core]` Bật RBAC AccessGuard (chặn quyền theo Role). Viết Interceptor để tự động Capture và lưu vào bảng `AuditLog`. (Estimate: 14h - Priority: Urgent)
- [ ] **TSK-203** `[FE_Admin]` Code màn hình Login Admin. Fix Layout Dashboard (Sidebar menu, Topbar). Xử lý state Cookie Token. (Estimate: 8h - Priority: High)
- [ ] **TSK-204** `[FE_Admin]` Thiết kế màn hình "Lịch sử Hệ Thống" cho SuperAdmin xem AuditLog data table. (Estimate: 6h - Priority: Medium)

---

## 📦 MODULE 3: HEADLESS CMS & NEWS SEO (Quản trị Nội dung)
- [ ] **TSK-301** `[BE_Api]` Cấu hình MinIO SDK. API `POST /api/media/upload` (Up lắt nhắt) và `upload-batch` (Up lưới ảnh). (Estimate: 12h - Priority: Urgent)
- [ ] **TSK-302** `[BE_Api]` Thiết kế API CRUD Tin Tức. Support logic sinh SEO Slug, Map AuthorId. Code chèn xoá Cache Redis. (Estimate: 14h - Priority: Urgent)
- [ ] **TSK-303** `[BE_Core]` Code API Khởi tạo Bộ Ảnh Kỷ niệm (Albums Manager). (Estimate: 10h - Priority: High)
- [ ] **TSK-304** `[FE_Admin]` Làm CMS Block: Trang quản lý Bài viết, Màn hình Soạn thảo Rich Text Editor và gán thẻ Meta SEO. (Estimate: 10h - Priority: Urgent)
- [ ] **TSK-305** `[FE_Admin]` Làm CMS Màn hình cấu hình Thư viện Albums, Giao diện kéo thả Drag & Drop Update Media Files. (Estimate: 8h - Priority: High)

---

## 📦 MODULE 4: DYNAMIC FORMS SYSTEM (Hệ thống Form động CMS)
- [ ] **TSK-401** `[BE_Api]` API Schema Form CRUD. Khởi tạo `FormDefinition` với logic Prisma Transaction map Field Json. (Estimate: 12h - Priority: Urgent)
- [ ] **TSK-402** `[FE_Admin]` Giao diện Kéo/Thêm Data Type Schema (Tạo trường Họ tên, Khoá...) bên trong CMS Admin. Code tính năng xem danh sách người đăng ký theo từng Sự kiện & Nút bấm Xuất File CSV/Excel. (Estimate: 8h - Priority: Urgent)
- [ ] **TSK-403** `[BE_Api]` Code Validate Filter Data Khách Submit Động. Đẩy dữ liệu chuẩn vào dạng Type JSON Postgres. Gắn kèm ID Sự Kiện (Article ID) vào bản ghi Submission để lọc. (Estimate: 14h - Priority: High)
- [ ] **TSK-404** `[FE_Public]` Code Màn hình Trang Submit Form Của Khách. Sử dụng NextJS đọc Schema API, render vòng lặp tạo ra GUI Form Tuỳ biến. (Estimate: 12h - Priority: High)

---

## 📦 MODULE 5: PUBLIC WEBSITE & MOTION (Giao diện hiển thị Ngoài)
- [ ] **TSK-501** `[FE_Public]` Code Trang Chủ: Hero Banner, Navbar, Footer. Áp hiệu ứng Glassmorphism. (Estimate: 10h - Priority: High)
- [ ] **TSK-502** `[FE_Public]` Code Trang Giới thiệu Khoa CNTT tĩnh tĩnh + Animation số đếm NumberTicker (Counters). (Estimate: 10h - Priority: Medium)
- [ ] **TSK-503** `[FE_Public]` Dùng Framer Motion hoặc MagicUI code Scroll Timeline tương tác dọc (Hành Trình 25 Tuổi). (Estimate: 10h - Priority: High)
- [ ] **TSK-504** `[FE_Admin]` Share lửa Dev: Giành việc Code UI Gallery Grid (Lưới Masonry Lightbox) cho View Khách hàng ngoài Web Public vì FE_Admin đã code mảng Media trên CMS. (Estimate: 10h - Priority: Medium)
- [ ] **TSK-505** `[PM/DevOps]` Cấu hình WAF Cloudflare rule chống spam DDoS. Bật Nginx Gzip, optimize Load Balancer Image SEO tăng điểm Lighthouse. (Estimate: 12h - Priority: High)

---

## 📦 MODULE 6: QA, OPTIMIZE & DEPLOY (Kiểm thử & Lên Server thật)
- [ ] **TSK-601** `[PM/DevOps]` Cài đặt Server thật của nhà Trường. Trỏ IP sinh SSL Let's Encrypt. Setup Bash script CI/CD tự động deploy khi push code. (Estimate: 16h - Priority: Urgent)
- [ ] **TSK-602** `[BE_Core]` Audit chéo Hệ Database: Optimize tốc độ Query của Prisma. Kiểm định tình trạng bùng nổ ram Redis Pool. (Estimate: 12h - Priority: High)
- [ ] **TSK-603** `[PM/DevOps]` Viết kịch bản E2E Test (Playwright) check Bug 1 vòng. Viết Docs Markdown bàn giao HDSD Dashboard Mời giảng viên dùng. (Estimate: 12h - Priority: Medium)
- [ ] **TSK-604** `[BE_Api]` Xây dựng tính năng Background Job Message Worker (xài BullMQ/Redis) để Queue gửi Tự động Email Welcome khách khi submit Form thành công. (Estimate: 10h - Priority: Low)

---

### ⚖️ TỔNG KẾT BẢNG CÂN BẰNG TẢI TRỌNG (WORKLOAD BALANCE):
*   `[PM/DevOps]`: 6 + 10 + 12 + 16 + 12 = **56h**
*   `[BE_Core]`: 8 + 12 + 14 + 10 + 12 = **56h**
*   `[BE_Api]`: 12 + 14 + 12 + 14 + 10 = **62h**
*   `[FE_Public]`: 12(Figma) + 8 + 12 + 10 + 10 + 10 = **62h**
*   `[FE_Admin]`: 12(Figma) + 8 + 6 + 10 + 8 + 8 + 10 = **62h**

> Trung bình mỗi Lập trình viên Code/Design khoảng **~60 giờ**. Tiến độ cực kỳ dàn đều, không có Developer nào rảnh rỗi hay bị đùn việc kiệt sức. Tốn thêm công sức vẽ Figma ban đầu sẽ giúp lúc gõ Code FE (Module 3-4-5) nhanh hơn rất nhiều. Lộ trình này quá lý tưởng cho sức vóc Team Core 5 người.
