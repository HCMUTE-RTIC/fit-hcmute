# LỘ TRÌNH VÒNG LẶP PHÁT TRIỂN (CYCLES / SPRINTS)

Trong Plane.so, **Cycles** là các Sprints (các chặng thời gian) quy định team sẽ bốc những Issue / Task nào ở Module nào vào giải quyết để cam kết Release sản phẩm đúng hẹn.

Dự án kéo dài **4 Cycles (8 Tuần)**. Dưới đây là bức tranh rải Task từ 6 Module vào từng Cycle.

---

### 🟢 CYCLE 1: Khởi Tạo Nền Tảng & Auth (Foundation Cycle)
*Thời gian dự kiến: Tuần 1 - Tuần 2*
*Mục tiêu:* Setup Framework, CSDL, Môi trường Docker và luồng Đăng nhập, Giao diện chính Admin.

**Các Tasks được lấy từ Backlog vào Cycle 1:**
- Phân hệ M0 (UI/UX Design): TSK-001 (Figma Public Web), TSK-002 (Figma CMS Admin)
- Phân hệ M1 (Infra): TSK-101 (Git/Lint), TSK-102 (Docker/Nginx)
- Phân hệ M1 (Base): TSK-103 (NestJS Core), TSK-104 (NextJS Base)
- Phân hệ M2 (IAM): TSK-201 (Auth JWT), TSK-203 (CMS Layout & Login)

---

### 🟡 CYCLE 2: Headless CMS Quản Trị Tĩnh (Content Management Cycle)
*Thời gian dự kiến: Tuần 3 - Tuần 4*
*Mục tiêu:* Hoàn thành toàn bộ flow tạo bài báo chuẩn SEO và Upload Minio thư viện Album. Gắn RBAC chặn quyền.

**Các Tasks được lấy từ Backlog vào Cycle 2:**
- Phân hệ M3 (CMS & SEO): TSK-301 (API Upload), TSK-302 (API Article), TSK-303 (API Albums), TSK-304 (FE CMS News), TSK-305 (FE CMS Gallery)
- Phân hệ M2 (IAM): TSK-202 (RBAC & Logic AuditLog)
- Phân hệ M5 (Public Web): TSK-501 (Trang Chủ Hero/Nav/Footer)

---

### 🟠 CYCLE 3: Cỗ Máy "Dynamic Form" & Hiệu Ứng Public (Core Logic Cycle)
*Thời gian dự kiến: Tuần 5 - Tuần 6*
*Mục tiêu:* Hoàn thiện Core "Form Động" kết nối Khách Web và Admin. Xây dựng UI xem Audit Lịch sử và hiệu ứng nhảy số.

**Các Tasks được lấy từ Backlog vào Cycle 3:**
- Phân hệ M4 (Dynamic Form): TSK-401 (API Form Schema), TSK-402 (FE CMS Builder), TSK-403 (API Validate Submit), TSK-404 (FE Form Công khai)
- Phân hệ M2 (IAM): TSK-204 (Giao diện xem AuditLog CMS)
- Phân hệ M5 (Public Web): TSK-502 (Review Giới thiệu & Counter), TSK-503 (Timeline Motion), TSK-504 (Lưới Gallery cho Khách)

---

### 🔴 CYCLE 4: Giám Sát, Tối Ưu Launching & Bàn Giao (Release Cycle)
*Thời gian dự kiến: Tuần 7 - Tuần 8*
*Mục tiêu:* Tối ưu Web Core Vitals, Caching, Setup VPS thật, Config CI/CD, Background Worker và Testing.

**Các Tasks được lấy từ Backlog vào Cycle 4:**
- Phân hệ M5 (Public Web Finalize): TSK-505 (Cloudflare WAF, Nginx Gzip)
- Phân hệ M6 (QA/Deploy): TSK-601 (VPS & CI/CD), TSK-602 (Optimize Prisma/Redis), TSK-603 (E2E Test & Docs), TSK-604 (Email Background Worker)
