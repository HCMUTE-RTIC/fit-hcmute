# 🚀 Backend Server - FIT HCMUTE 25th Anniversary Website

Hệ thống Backend (Headless CMS) phục vụ cho Web Kỷ niệm 25 năm thành lập Khoa CNTT - ĐH Sư Phạm Kỹ Thuật TP.HCM.

## 🏗️ 1. Kiến trúc Công nghệ (Tech Stack)
*   **Framework chính:** NestJS (Node.js) - *Phục vụ logic REST API.*
*   **Cơ sở dữ liệu:** PostgreSQL 16 - *Lưu trữ dữ liệu Relational chính.*
*   **ORM (Kết nối CSDL):** Prisma ORM - *Xử lý Migration và tạo Model Type-safe.*
*   **Lưu trữ Tệp tĩnh (Media):** MinIO S3 (Tự host) - *Chịu trách nhiệm chứa Ảnh, PDF Kỷ yếu.*
*   **Cache & Queue:** Redis 7 - *Dùng để Cache kết quả API tĩnh và xử lý luồng tin nhắn nền (Job Queue).*

---

## 🛠️ 2. Quy trình cài đặt cho Lập trình viên (Local Development)

### Bước 2.1: Bật các Services Hệ thống (DB, MinIO, Redis)
Trước khi cài Node Package, máy tính bạn phải có **Docker**. Khởi động cụm Server giả lập bằng file Compose gốc của dự án:
```bash
# Đứng tại thư mục CHÍNH ROOT của Dự án chạy lệnh này:
docker compose -f docker-compose.dev.yml up -d
```
*Lệnh này sẽ tự động giăng sẵn DB Postgres (port 5432), Redis (6379), S3 MinIO (9000).*

### Bước 2.2: Cài thư viện NPM
```bash
# Di chuyển vào thư mục code server
cd server

# Cài đặt toàn bộ Node Modules
pnpm install
```

### Bước 2.3: Đồng bộ Database Schema (Prisma)
Chắc chắn rằng bạn đã copy/có sẵn thông số DB của file `.env.development` ném vào trong folder `/server` với tên `.env`.

Sau đó chạy lệnh thiết lập Database lần đầu:
```bash
# Sinh code Type Definition cho TypeScript
pnpm exec prisma generate

# Đồng bộ Cấu trúc Bảng (Schema.prisma) xuống cơ sở dữ liệu thật
pnpm exec prisma db push

# Chạy lệnh Tự động chèn tài khoản Admin Khai sinh vào DB
pnpm exec prisma db seed
# => Sẽ in ra tài khoản "admin@fit.hcmute.edu.vn" / "SysAdmin@Fit25Years!"
```

### Bước 2.4: Khởi động Server NestJS Code
```bash
# Chạy ở chế độ Theo dõi rà soát lỗi (Hot-reload)
pnpm run start:dev
```
*API lúc này sẽ live ở địa chỉ: `http://localhost:3000/api/v1`*

---

## 📖 3. Các lệnh thường dùng trong quá trình Code
*   **Xem Database qua giao diện Web (Prisma Studio):**
    ```bash
    pnpm exec prisma studio
    ```
    *Dành cho DEV không xài phần mềm DBeaver/Datagrip, có thể mở GUI Prisma trên Port 5555 để xem và sửa data trực quan.*

*   **Khi có ai đó trong Team vừa đổi bảng CSDL (`schema.prisma`):**
    ```bash
    # Nếu bạn vừa Git Pull mà có đồng đội sửa DB, bạn bắt buộc chạy lại:
    pnpm exec prisma db push
    pnpm exec prisma generate
    ```

*   **Tạo một file Migration mới để Review (Dùng cho Production nâng cấp):**
    ```bash
    pnpm exec prisma migrate dev --name init_db
    ```

---

## 📂 4. Cấu trúc Source Code Hiện tại
```text
server/
├── prisma/               # Chứa logic kết nối CSDL ORM
│   ├── schema.prisma     # Nơi định nghĩa toàn bộ Bảng/Quan hệ (ERD Model)
│   └── seed.ts           # Code logic chèn dữ liệu tạo user Mẫu
├── src/                  # Nơi code logic chính của NestJS (Controller, Service)
│   ├── main.ts           # File cấu hình Gốc Bootstrap Application
│   └── ... 
├── .env                  # (Khuất) File chứa biến kết nối cá nhân (không lên Github)
├── package.json          # File cấu hình Package rễ
└── README.md             # Tài liệu này
```

---

## 🤝 5. Quy tắc Code API Nhắc nhớ
*   **Luôn bọc kết quả trả về bằng JSON Formatter chuẩn:** `{ success, message, data, errorCode }`
*   **Tên Endpoint:** Bắt buộc tuân thủ chuẩn RESTFul, dùng Danh từ Số Nhiều: `GET /articles`, `POST /form-definitions`. Tuyệt đối không xài Động từ trên URL (Ví dụ sai: `POST /createNews`).
*   Tuân thủ nghiêm ngặt chuẩn check code tự động bằng lệnh `pnpm run format` và `pnpm run lint` trước khi tạo Pull Request! Dòng code nào còn sót lệnh `console.log()` sẽ bị đánh trượt PR.
