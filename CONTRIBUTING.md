# Đóng Góp Vào Dự Án FIT HCMUTE

Cảm ơn bạn đã quan tâm đến việc đóng góp cho dự án FIT HCMUTE - Hệ Thống Kỷ Niệm 25 Năm Thành Lập Khoa CNTT! Câu Lạc Bộ Nghiên Cứu Công Nghệ và Đổi Mới Sáng Tạo (RTIC) luôn hoan nghênh những ý tưởng, báo cáo lỗi và các bản vá (pull requests) từ mọi thành viên để đóng góp cho khoa.

## 📝 Quy Trình Đóng Góp

### 1. Báo cáo lỗi (Report Bugs)
Nếu bạn tìm thấy bất kỳ lỗi nào, vui lòng mở một Issue mới và sử dụng [Mẫu Báo Cáo Lỗi](.github/ISSUE_TEMPLATE/bug_report.md) (nếu có) hoặc cung cấp các thông tin sau:
- Mô tả chi tiết về lỗi bạn gặp phải.
- Các bước để tái tạo lỗi (Steps to reproduce).
- Môi trường bạn đang sử dụng (Trình duyệt, Hệ điều hành, Môi trường Local/Prod).
- Ảnh chụp màn hình nếu có.

### 2. Đề xuất tính năng (Feature Requests)
Bạn có một ý tưởng tuyệt vời cho hệ thống? Hãy mở Issue và trình bày:
- Vấn đề bạn muốn giải quyết.
- Giải pháp đề xuất.
- Bất kỳ giải pháp thay thế nào bạn đã cân nhắc.

### 3. Gửi Pull Requests
Chúng tôi khuyến khích các Pull Request (PR) đóng góp mã nguồn (fixes, features, refactors). Hãy tuân theo quy trình sau:
1. **Fork** dự án gốc về tài khoản cá nhân của bạn.
2. Clone repository đã fork về máy.
3. Tạo một nhánh mới từ `main` với tên mô tả công việc của bạn:
   - Feature: `feat/ten-chuc-nang`
   - Bug fix: `fix/ten-loi`
   - Khác: `refactor/...`, `docs/...`
4. Cập nhật mã nguồn. Vui lòng **luôn chạy formatter và linter** trước khi commit:
   - Đối với frontend: `pnpm run lint` & `pnpm run format`
   - Đối với backend: `npm run lint` & `npm run format`
5. Khuyến khích viết test (nếu nằm trong vùng an toàn có thể test).
6. Viết commit code rõ ràng bám sát quy chuẩn (VD: Conventional Commits `feat: add awesome feature`).
7. Push nhánh lên fork của bạn.
8. Mở Pull Request vào nhánh `main` của dự án gốc. Vui lòng điền đầy đủ mô tả PR.

## 💻 Môi Trường Lập Trình (Development)

Dự án sử dụng kiến trúc Monorepo. Hãy xem file [README.md](README.md) ở thư mục gốc để biết hướng dẫn cài đặt môi trường (`Next.js`, `NestJS`, `PostgreSQL`, `Docker`).

## 💬 Yêu Cầu Giao Tiếp & Quy Tắc Ứng Xử
Mọi người tham gia đóng góp phải tuân thủ [Quy Tắc Ứng Xử](CODE_OF_CONDUCT.md) của dự án. Hãy giữ một thái độ chuyên nghiệp, tôn trọng lẫn nhau vì một cộng đồng FIT HCMUTE vững mạnh.
XR_
Cảm ơn bạn rất nhiều!
- Nhóm Kỹ Thuật Dự Án (RTIC)
