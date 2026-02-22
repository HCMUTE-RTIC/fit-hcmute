# QUY CHUẨN LÀM VIỆC CHUNG CỦA DỰ ÁN (PROJECT RULES & CONVENTIONS)

Tài liệu này là "Nguyên tắc vàng" bắt buộc 5 thành viên trong team Frontend, Backend và DevOps phải tuân thủ để tránh conflict code, lỗi logic gãy vặt và giữ source code luôn sạch, dễ bảo trì.

---

## 🏗️ 1. CÂY THƯ MỤC VÀ TÊN FILE (NAMING CONVENTIONS)
*   **Thư mục và Tên file (`kebab-case`):** 100% tên thư mục và tên file (áp dụng cả React component file name) phải viết thường, cách nhau bằng dấu gạch ngang.
    *   ✅ Tốt: `user-profile.controller.ts`, `button-primary.tsx`
    *   ❌ Xấu: `UserProfile.js`, `navBar.ts`
*   **Tên Class và Component (`PascalCase`):** Viết hoa chữ cái đầu cho định nghĩa logic.
    *   ✅ Tốt: `export class ArticleService {}`, `export const NavigationBar = () => {}`
*   **Tên Biến và Hàm (`camelCase`):** 
    *   ✅ Tốt: `isUserLoggedIn`, `fetchArticlesList()`
*   **Hằng số (Khai báo ENUM hoặc `const` toàn cục) (`UPPER_SNAKE_CASE`):**
    *   ✅ Tốt: `MAX_UPLOAD_SIZE = 5000000;`, `export enum Role { SUPER_ADMIN = 'SUPER_ADMIN' }`

---

## 🌳 2. QUY CHUẨN GITHUB (GIT WORKFLOW)
Dự án áp dụng Branching Model cơ bản của [Github Flow]:
*   **`main` branch:** Source code sạch tuyệt đối để Deploy lên Server Thật (Production). Chỉ Leader/PM mới được phép nhấn nút Merge vào nhánh này.
*   **`develop` branch:** Nhánh môi trường STAGING. Tất cả anh em dev sẽ ghép code vào đây để review chéo và test tổng thể trước khi release.
*   **`feature/*` nhánh tính năng cá nhân:** Bắt buộc phải rẽ nhánh từ `develop`. Cấm push thẳng lên `develop` hay `main`.
    *   Cú pháp nhánh: `tên_loại/ID-của-Task-Mô-tả-ngắn`
    *   Ví dụ bạn nhận TSK-302: `git checkout -b feature/TSK-302-api-crud-news`
    *   Ví dụ bạn sửa bug UI TSK-501: `git checkout -b bugfix/TSK-501-fix-navbar-mobile`
*   **Commit Message (Conventional Commits):** Bắt buộc phải có Tiền tố để dễ đọc Lịch sử.
    *   `feat: [TSK-201] add JWT login token` (Thêm tính năng)
    *   `fix: [TSK-501] resolve responsive crash on iPhone` (Sửa lỗi)
    *   `chore: update NextJS to v14` (Cập nhật config)
    *   `docs: update readme API Minio` (Sửa tài liệu)

---

## 📡 3. QUY TRÌNH KẾT NỐI API (REST API STANDARDS DÀNH CHO BACKEND)
Tất cả API response phải bọc vào một Interface/DTO duy nhất để Frontend dễ bề parse JSON, tuyệt đối không trả về raw error của Prisma (Database).

**Cấu trúc JSON Response (Chuẩn 1 chiều):**
```json
{
  "success": true,           // true | false
  "message": "Đăng tải bài viết thành công", 
  "data": {                  // Payload trả về (nếu có null thì trả object rỗng)
     "id": 12,
     "title": "Kỷ niệm 25 năm..."
  },
  "errorCode": null          // Nếu success=false, chỗ này sẽ lưu text ví dụ "INVALID_TOKEN", "ARTICLE_NOT_FOUND" để FE dễ show Toast.
}
```

**Định tuyến API (URL Routing):**
*   Phải luôn có tiền tố `/v1/` để quy định phiên bản: `GET /api/v1/articles`
*   Tên Resource dùng **danh từ số nhiều**, cấm dùng động từ (Backend tuân thủ RESTful): 
    *   ✅ Chuẩn: `POST /api/v1/users`
    *   ❌ Sai: `POST /api/v1/createUser` hoặc `GET /api/v1/getLatestNews`

---

## 🎨 4. QUY CHUẨN FRONTEND (NEXTJS / REACT)
*   **Chia để trị (Tách UI khỏi Logic):** Không nhét logic loạn xạ vào Component React UI presentational. Tách biệt Component Render UI ra khỏi Container Hooks.
    *   Ví dụ: Rút logic Call API ra file Custom Hook `useFetchArticles()`, file giao diện `NewsList.tsx` chỉ thuần túy móc `data / loading / error` ra xài vòng lặp map vẽ HTML.
*   **Kiểm soát Tailwind:** Tuyệt đối hạn chế rác class HTML (Spaghetti Code). Không viết nội tuyến 1 chuỗi class dài ngoằng trên 300 kí tự. Cần bọc ra file `globals.css` nếu 1 mảng design UI (Ví dụ class Button) được tái sử dụng nhiều nơi (Dùng `@apply`).
*   **Ảnh và Tệp Media:** Luôn dùng `<Image>` component của hệ sinh thái NextJS để tự động convert sang thẻ picture Webp lazy load. Tuyệt đối cấm xài thẻ `<img>` thô của HTML.

---

## 🛠️ 5. QUY TẮC RÀ CODE (CODE REVIEW & CI) - DÀNH CHO PM/DEV CẦM TRỊCH
*   **No Copy-Paste mù quáng:** Developer được khuyến khích xài AI (Copilot/ChatGPT), nhưng nếu Pull Request nhét 1 đoạn code phức tạp vào mà dev **không tự tay giải thích được luồng chạy**, Pull Request đó LẬP TỨC BỊ REJECT.
*   **Format tự động trước Commit (Husky Hook):** Source code trước khi Push lên Github sẽ bị chặn lại và màng lọc Husky gắn sẵn trong Pre-commit sẽ tự động chạy:
    1.  Tự động canh lề gọt khoảng trắng thừa bằng `Prettier` (`npm run format`).
    2.  Bắt lỗi khai báo dỏm bằng `ESLint` (`npm run lint`).
*   **Clean Code:** Pull Request sẽ bị REJECT không thương tiếc nếu còn tồn tại dòng chữ `console.log("kiem tra biến này nè")` hay các khối code logic rác bị comment vứt lay lắt `// const oldCode = "bỏ"` trong tệp tin làm bẩn source chung. Bắt buộc xóa dọn dẹp sạch sẽ trước khi tạo MR/PR.
