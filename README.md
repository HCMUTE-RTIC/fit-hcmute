# FIT HCMUTE - Hệ Thống Kỷ Niệm 25 Năm Thành Lập Khoa CNTT

Chào mừng đến với mã nguồn của dự án Kỷ niệm 25 năm thành lập Khoa Công Nghệ Thông Tin (FIT) - Trường Đại học Sư phạm Kỹ thuật TP.HCM (HCMUTE).

Dự án được triển khai dưới dạng **Monorepo** với kiến trúc hiện đại, tách biệt rõ ràng giữa Backend (API Server) và Frontend (Web Client).

---

## 🚀 Công Nghệ Sử Dụng (Tech Stack)

### **Frontend (`/client`)**
*   **Framework**: [Next.js v16](https://nextjs.org/) (Sử dụng Turbopack để tăng tốc độ build/dev).
*   **Thư viện UI**: [React v19](https://react.dev/), [TailwindCSS v4](https://tailwindcss.com/).
*   **Quản lý State & Animation**: [Framer Motion](https://www.framer.com/motion/) cho các hiệu ứng chuyển động mượt mà.
*   **Icons & Theming**: `lucide-react`, `next-themes` (Hỗ trợ Dark/Light mode).
*   **Workspace & Build Tool**: [Turborepo](https://turbo.build/) & Pnpm workspace.

### **Backend (`/server`)**
*   **Framework Core**: [NestJS v11](https://nestjs.com/) (Framework mạnh mẽ nhất cho Node.js).
*   **Ngôn ngữ**: TypeScript.
*   **Database & ORM**: PostgreSQL được quản lý thông qua [Prisma](https://www.prisma.io/).
*   **Authentication & Security**: Passport & JWT (`@nestjs/passport`, `@nestjs/jwt`), Bcrypt.
*   **Lưu trữ File (Storage)**: [MinIO](https://min.io/) (Giải pháp self-hosted S3-compatible).
*   **Caching**: Redis (sử dụng `@keyv/redis` và Cache Manager của NestJS).

---

## 📂 Cấu Trúc Thư Mục (Monorepo Structure)

```text
d:\RTIC\fit-hcmute
├── client/                     # Phân hệ Frontend (Turborepo workspace)
│   ├── apps/
│   │   └── web/                # Ứng dụng Next.js chính
│   ├── packages/               # Các thư viện dùng chung cho nội bộ frontend
│   │   ├── @workspace/ui       # Các component UI dùng chung
│   │   ├── @workspace/eslint-config
│   │   └── @workspace/typescript-config
│   ├── package.json            # Chứa các script chạy UI (turbo build/dev)
│   └── pnpm-workspace.yaml     # Định nghĩa workspace cho pnpm
│
├── server/                     # Phân hệ Backend (NestJS workspace)
│   ├── prisma/                 # Định nghĩa Database Schema & Seed data
│   ├── src/                    # Mã nguồn chính của Server
│   │   ├── auth/               # Module Xác thực và Phân quyền
│   │   ├── users/              # Module Quản lý người dùng
│   │   ├── articles/           # Module Quản lý Bài viết
│   │   ├── albums/             # Module Quản lý Album ảnh
│   │   ├── media/              # Module Quản lý Upload File (MinIO)
│   │   ├── audit-logs/         # Module Ghi nhận lịch sử hệ thống
│   │   ├── forms/              # Module Quản lý Biểu mẫu
│   │   └── common/             # Các constants, filters, interceptors dùng chung
│   └── docker-compose.yml      # (Nếu có) File khởi tạo service đi kèm
│
├── docker-compose.dev.yml      # Cấu hình Docker Compose cho môi trường Development (Postgres, MinIO, Redis...)
└── docker-compose.prod.yml     # Cấu hình Docker Compose cho môi trường Production
```

---

## 🛠 Hướng Dẫn Cài Đặt và Khởi Chạy (Getting Started)

### 1. Yêu cầu hệ thống (Prerequisites)
- [Node.js](https://nodejs.org/) (phiên bản `>=20`).
- [Pnpm](https://pnpm.io/) (Trình quản lý package chính cho Frontend Workspace).
- [Docker & Docker Compose](https://www.docker.com/) (Dùng để chạy Database, Redis, MinIO ở Local).

### 2. Thiết lập Môi trường (Environment Setup)

Dự án cung cấp sẵn `.env.development` để bạn có thể copy và đổi tên thành `.env` (hoặc dùng trực tiếp cho docker).

**Đối với Backend:**
Chuyển vào thư mục `server/`, copy file `.env` mẫu (nếu chưa có, xem các biến môi trường trong `.env.development`). Đảm bảo cấu hình các biến như `DATABASE_URL`, `MINIO_*`, `REDIS_*`...

**Đối với Frontend:**
Chuyển vào thư mục `client/apps/web/`, đã có file `.env.local` cấu hình trỏ tới backend:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Khởi chạy các dịch vụ Data (Postgres, Redis, Minio)
Tại thư mục gốc, chạy lệnh sau để bật các service phụ thuộc:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### 4. Chạy Backend (NestJS Server)
```bash
cd server
npm install    # (hoặc pnpm install)
npm run start:dev
```
Server sẽ chạy mặc định tại cổng `3000`. Cố gắng chạy `npx prisma db push` hoặc `npx prisma migrate dev` nếu bạn cần khởi tạo database lần đầu.

### 5. Chạy Frontend (Next.js Client)
Mở một terminal khác, cài đặt dependencies và chạy Web client:
```bash
cd client
pnpm install
pnpm run dev
```
Client sẽ chạy mặc định bởi Turborepo trên cổng `3001` hoặc cổng có sẵn theo Next.js cấp phát (có thể là `3000` nếu backend chạy cổng khác - hãy lưu ý xung đột cổng).

---

## 🔒 Quy trình (Workflow) và Deploy
- Môi trường PRODUCTION sử dụng file `docker-compose.prod.yml` và các file `.env.production`. Vui lòng xem kỹ file `.env.production` để đổi các Secret Key/Passwords trước khi đưa hệ thống ra public.
- Frontend Build: `cd client && pnpm run build`.
- Backend Build: `cd server && npm run build`.

---
*Dự án được bảo trì và phát triển bởi Câu Lạc Bộ Nghiên Cứu Công Nghệ và Đổi Mới Sáng Tạo (HCM UTE Research on Technology and Innovation Club - RTIC) dành riêng cho Khoa Công Nghệ Thông Tin (FIT).*
