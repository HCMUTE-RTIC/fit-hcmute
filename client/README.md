# 🎨 Frontend Workspace - FIT HCMUTE 25th Anniversary Website

Tài liệu này hướng dẫn các bạn Dev Frontend cách khởi chạy, cài đặt thư viện và cấu trúc thư mục của dự án (dựa trên **Turborepo**).

## 🏗️ 1. Cấu trúc Source Code (Monorepo)
Website của chúng ta vận hành dưới dạng Monorepo, giúp tái sử dụng config ESLint, TypeScript dễ dàng:

```text
client/
├── apps/
│   └── web/                   # 🔴 ĐÂY LÀ ỨNG DỤNG WEB CHÍNH (Next.js App Router)
│       ├── app/               # Nơi chứa Pages, Layout, Routing
│       ├── lib/               # Thư viện tiện ích (utils.ts)
│       └── public/            # Hình ảnh tĩnh, favicon
├── packages/                  # CÁC GÓI CODE DÙNG CHUNG (Tất cả app trong Monorepo xài chung)
│   ├── ui/                    # 🟡 GÓI GIAO DIỆN (Nơi cài Tailwind, chứa UI Shadcn & MagicUI)
│   │   ├── src/components/    # Source code các Component (VD: globe.tsx, button.tsx)
│   │   ├── tailwind.config.ts # File thiết lập màu sắc, design system của toàn dự án
│   │   └── components.json    # Cấu hình đường dẫn của Shadcn-UI 
│   ├── eslint-config/         # 🟢 GÓI CẤU HÌNH LINT: Chứa rules chuẩn bắt lỗi cú pháp Next.js/React
│   └── typescript-config/     # 🔵 GÓI CẤU HÌNH TS: Chứa các quy định type-checking cho toàn bộ Repo
├── package.json               # Quản lý dependency rễ
├── pnpm-workspace.yaml        # Khai báo cho pnpm biết đây là Monorepo (chứa apps/* và packages/*)
└── README.md                  # Hướng dẫn này
```

---

## 🚀 2. Hướng dẫn Khởi chạy (Local Development)

### Bước 2.1: Cài đặt Node Modules (Từ gốc dự án)
Quá trình này sẽ diễn ra ở cấp rễ thư mục `client/`:
```bash
# Sử dụng pnpm để cài package (KHÔNG DÙNG npm nhé)
pnpm install
```

### Bước 2.2: Chạy Server Next.js phục vụ Code
Vẫn đứng ở thư mục gốc `client/`, chạy Next.js thông qua lệnh của Turborepo:
```bash
pnpm dev
```
*Trang web lúc này sẽ live ở địa chỉ: `http://localhost:3001` (Cổng 3001 đã được map sẵn cho Backend).*

---

## 🧩 3. Cách thêm thư viện Shadcn-UI & MagicUI CỰC KỲ QUAN TRỌNG

**⚠️ LỖI KINH ĐIỂN NHẤT CỦA DEV MỚI:** 
Đứng ở thư mục rễ `/client/` hoặc ngay tại `/apps/web/` và gọi lệnh `pnpm dlx shadcn add [tên-component]`. Lúc này hệ thống sẽ báo lỗi `We could not detect a supported framework...`.

**✅ CÁCH LÀM ĐÚNG: Bạn phải đi sâu vào thư mục chứa UI dùng chung của Monorepo trước khi gọi cài đặt!**

```bash
# 1. BẮT BUỘC chui vào gói UI Share
cd packages/ui

# 2. Cài bất kỳ Component nào của Shadcn
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add dialog

# 3. Cài bất kỳ Component chuyển động nào của MagicUI
pnpm dlx shadcn@latest add @magicui/globe
```

*Tất cả component sau khi cài sẽ tự động chui vào folder: `packages/ui/src/components/` và có thể import trực tiếp từ nextjs thông qua tên package (VD: `@repo/ui/components/ui/button`)*
