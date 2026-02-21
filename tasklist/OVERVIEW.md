# KẾ HOẠCH PHÂN BỔ NHÂN SỰ & QUẢN TRỊ DỰ ÁN (PLANE.SO STYLE)

**Dự án:** Website Kỷ niệm 25 năm Khoa CNTT HCMUTE  
**Quy mô Team:** 5 thành viên (Tham chiếu cấu trúc Plane.so / Agile)  
**Thời gian hoàn thành dự kiến (Sprint):** 4 Sprint (1 Sprint = 2 tuần)

---

## 1. VAI TRÒ NHÂN SỰ (ROLES)

Danh sách 5 thành viên trong team, mỗi bạn sẽ được "gắn mác" Assignee cho các Module cụ thể.

| Thành viên (Member) | Vai trò (Role) | Chuyên môn đảm nhận (Responsibility) | Bí danh (Assigned Code) |
| :--- | :--- | :--- | :--- |
| **Thành viên 1** | PM / DevOps / QA | Lên Planning (như tài liệu này), setup server Docker, quản lý repository, cấu hình CI/CD và kiểm thử hệ thống tổng thể. Kiểm soát tiến độ Sprint trên Plane.so. | `[PM/DevOps]` |
| **Thành viên 2** | Lead Backend (NodeJS) | Thiết kế DB Prisma Schema, cấu hình Core NestJS. Dựng module Authentication, RBAC (Phân quyền) và cơ chế Audit Log. Quản lý thư mục `tasklist/backend`. | `[BE_Core]` |
| **Thành viên 3** | Backend & Services | Code API CRUD Tin tức, Media Album, tích hợp streaming File qua MinIO S3, Setup logic Dynamic Form, Redis queue. | `[BE_Api]` |
| **Thành viên 4** | Lead Frontend (React) | Khởi tạo cấu trúc dự án NextJS, cấu hình Tailwind/MagicUI. Code các màn hình chính (Trang Chủ, Hành trình 25 năm, Thành tựu). Gắn data tĩnh & Counter animation. | `[FE_Motion]` |
| **Thành viên 5** | Frontend & CMS Admin | Hoàn thiện Frontend luồng Tin Tức, Layout Thư viện ảnh SEO. Thiết kế màn hình CMS (Admin Dashboard) gọi API cấu hình Form động và hiển thị dữ liệu AuditLog. | `[FE_Admin]` |

---

## 2. QUẢN TRỊ THEO PLANE.SO (MODULES & CYCLES)

Thay vì tổ chức Task tuyến tính, dự án này áp dụng mô hình ma trận của Plane.so:
1.  **Modules (Tính năng lõi):** Các thẻ Task (Issues) được gom vào 5 Modules cốt lõi của hệ thống (Ví dụ: `Core Infra`, `Auth & RBAC`, `Dynamic Form`...). Mô tả rõ ràng Issue Code, Ưu tiên và Assignee. Vui lòng xem ở file `MODULES_AND_TASKS.md`.
2.  **Cycles (Vòng lặp thời gian):** Nhóm các Issues từ nhiều Module khác nhau vào cùng 1 thời kỳ để cam kết giao hàng (Sprints). Dự án rải qua 4 Cycles (Mỗi cycle tương đương 2 tuần). Vui lòng xem ở file `CYCLES.md`.

---

## 3. NGUYÊN TẮC LÀM TASK (ISSUE TRACKING RULES)

Để đồng bộ với **Plane.so**, mỗi khi tạo thẻ Issue (Task card), các bạn tuân thủ:

1.  **State (Trạng thái):** `Backlog` ➡️ `Todo` ➡️ `In Progress` ➡️ `In Review` (Pull Request) ➡️ `Done`.
2.  **Priority (Độ ưu tiên):** 
    *   🔴 `Urgent` (Chặn luồng code của bạn khác/Lỗi Crash)
    *   🟠 `High` (Tính năng cốt lõi / Core logic)
    *   🟡 `Medium` (Tính năng hiển thị UI cơ bản)
    *   🟢 `Low` (Hiệu ứng nhỏ, chỉnh màu sắc, tối ưu nhẹ)
3.  **Label (Nhãn):** `Bug`, `Feature`, `Enhancement`, `DevOps`.
4.  **Estimate:** Ghi số giờ (Points) dự định làm để team Review trước Sprint.
