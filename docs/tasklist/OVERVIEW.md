# KẾ HOẠCH PHÂN BỔ NHÂN SỰ & QUẢN TRỊ DỰ ÁN (PLANE.SO STYLE)

**Dự án:** Website Kỷ niệm 25 năm Khoa CNTT HCMUTE  
**Quy mô Team:** 5 thành viên (Tham chiếu cấu trúc Plane.so / Agile)  
**Thời gian hoàn thành dự kiến (Sprint):** 4 Sprint (1 Sprint = 2 tuần)

---

## 1. VAI TRÒ NHÂN SỰ (ROLES)

Danh sách 5 thành viên trong team, mỗi bạn sẽ được "gắn mác" Assignee cho các Module cụ thể.

| Thành viên (Member) | Vai trò (Role) | Chuyên môn đảm nhận (Responsibility) | Bí danh |
| :--- | :--- | :--- | :--- |
| **Thành viên 1** | PM / DevOps / QA | Quản trị server Docker, CI/CD, Nginx, Cấu hình SSL, Bảo mật Cloudflare WAF và Testing tổng thể. | `[PM/DevOps]` |
| **Thành viên 2** | Lead Backend (Core) | Khởi tạo NestJS, Prisma Schema. Phụ trách cốt lõi: Auth JWT, Phân quyền RBAC, Cache Redis và Interceptor Audit Log. | `[BE_Core]` |
| **Thành viên 3** | Backend Services | Viết API chức năng: Tin tức, Upload tệp tin MinIO, API Dynamic Form Schema và Background Worker gửi Email. | `[BE_Api]` |
| **Thành viên 4** | Lead Frontend (Public) | Thiết kế Figma & Code toàn bộ giao diện cho Khách/Sinh viên xem. Trang chủ, Hành trình, Form tuỳ biến. Phụ trách Animation UI/UX. | `[FE_Public]` |
| **Thành viên 5** | Frontend (Admin) | Thiết kế Figma & Code toàn bộ CMS Admin Dashboard: Quản lý Form, Bài báo, Dựng lưới Thư viện ảnh, Giao diện xem lịch sử Hệ thống. | `[FE_Admin]` |

---

## 2. QUẢN TRỊ THEO PLANE.SO (MODULES & CYCLES)

Thay vì tổ chức Task tuyến tính, dự án này áp dụng mô hình ma trận của Plane.so:
1.  **Modules (Tính năng lõi):** Các thẻ Task (Issues) được gom vào **7 Modules** cốt lõi của hệ thống (Bao gồm cả UI/UX Design). Mô tả rõ ràng Issue Code, Ưu tiên và Assignee. Vui lòng xem ở file `MODULES_AND_TASKS.md`.
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
