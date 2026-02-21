# LỘ TRÌNH VÒNG LẶP PHÁT TRIỂN (CYCLES / SPRINTS)

Trong Plane.so, **Cycles** là các Sprints (các chặng thời gian) quy định team sẽ bốc những Issue / Task nào ở Module nào vào để giải quyết để cam kết Release sản phẩm theo lộ trình. 

Dự án kéo dài **4 Cycles (8 Tuần)**. Dưới đây là bức tranh rải Task từ các Module vào từng Cycle.

---

### 🟢 CYCLE 1: Khởi Tạo Nền Tảng (Foundation Cycle)
*Thời gian dự kiến: Tuần 1 - Tuần 2*
*Mục tiêu:* Setup Framework, CSDL, Base DevOps, Màn hình Auth Admin.

**Các Tasks được lấy từ Backlog vào Cycle 1:**
- Phân hệ DevOps: TSK-101 (Git/Lint), TSK-102 (Docker DB/MinIO).
- Phân hệ Module-1 (Base Code): TSK-103 (NestJS Core), TSK-104 (NextJS Base).
- Phân hệ Module-2 (Auth & RBAC): TSK-201 (Auth Auth DB), TSK-203 (CMS Layout & Login).

---

### 🟡 CYCLE 2: Headless CMS Quản Trị Tĩnh (Content Management Cycle)
*Thời gian dự kiến: Tuần 3 - Tuần 4*
*Mục tiêu:* Hoàn thành toàn bộ flow tạo bài báo chuẩn SEO và Upload Minio thư viện Album.

**Các Tasks được lấy từ Backlog vào Cycle 2:**
- Phân hệ Module-3 (CMS & SEO): 
  - TSK-301 (API MinIO Upload)
  - TSK-302 (API Article Cache)
  - TSK-303 (API Albums)
  - TSK-304 (FE CMS News GUI)
  - TSK-305 (FE CMS Media Gallery UI)
- Phân hệ Module-2 (Auth & RBAC): TSK-202 (Bật RBAC Access Control Interceptor).
- Phân hệ Module-5 (Public Web): TSK-501 (Anh Front-end Motion bắt đầu làm Trang Chủ tĩnh).

---

### 🟠 CYCLE 3: Cỗ Máy "Dynamic Form" & Audit Logging (Core Logic Cycle)
*Thời gian dự kiến: Tuần 5 - Tuần 6*
*Mục tiêu:* Hoàn thiện Core "Form Động" kết nối toàn bộ 2 đầu Public Web và Admin Dashboard. Xây dựng Audit màn hình cho Super Admin.

**Các Tasks được lấy từ Backlog vào Cycle 3:**
- Phân hệ Module-4 (Dynamic Form):
  - TSK-401 (API Form Schema)
  - TSK-402 (FE CMS Tool Tạo Form)
  - TSK-403 (API Data Submit Auto-reply)
  - TSK-404 (FE Khách render GUI Form Tuỳ biến)
- Phân hệ Module-2 (Auth & RBAC): TSK-204 (Bảng Quản lý Lịch sử AuditLog CMS).
- Phân hệ Module-5 (Public Web): TSK-502 (Làm Counter Trang Giới Thiệu), TSK-503 (Cột mốc 25 năm Timeline Animation).

---

### 🔴 CYCLE 4: Frontend Giao Tiếp Toàn Diện & Tối Ưu Launching (Release Cycle)
*Thời gian dự kiến: Tuần 7 - Tuần 8*
*Mục tiêu:* Ghép Component API trang tin tức, tối ưu Web Core Vitals, Testing QA và bàn giao code.

**Các Tasks được lấy từ Backlog vào Cycle 4:**
- Phân hệ Module-5 (Public Web Finalize):
  - TSK-504 (Trang Lưới Album Sự Kiện & Tin tức)
  - TSK-505 (Nginx, Tốc độ tải trang, Responsive Bug Fix).
- Hoạt động chéo: Test Cross-team, Bug Bash Day (Trải nghiệm làm người phá hoại DB xem AuditLog có lưu đúng tên không). Bàn giao HDSD cho Khoa.
