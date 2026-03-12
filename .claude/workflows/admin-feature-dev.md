# Workflow: Phát triển tính năng Admin Panel

## Tổng quan
Checklist chuẩn khi thêm hoặc sửa tính năng trong khu vực `/admin` của Next.js frontend.

---

## 1. Tạo Service trước, page sau

Luôn bắt đầu bằng service layer trước khi viết UI.

```
services/
  └── <feature>.service.ts   ← API calls, types, interfaces
app/admin/
  └── <feature>/page.tsx     ← UI sử dụng service
```

### Cấu trúc service chuẩn
```typescript
import { getAuthToken } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const FeatureService = {
  findAll: async (): Promise<Item[]> => {
    const res = await fetch(`${API_URL}/api/<endpoint>`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch");
    return res.json();
  },

  create: async (data: CreateDto): Promise<Item> => {
    const token = getAuthToken();
    const res = await fetch(`${API_URL}/api/<endpoint>`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create");
    return res.json();
  },
};
```

---

## 2. Quy tắc KHÔNG được vi phạm

- **Không hardcode URL** — luôn dùng `process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"`
- **Không gọi fetch trực tiếp trong page** — luôn đi qua services layer
- **Không bỏ auth header** — endpoint POST/PATCH/DELETE phải gửi `Authorization: Bearer ${token}`
- **Không return mock data** khi backend lỗi — throw error thật để dễ debug
- **Không dùng `npm` hay `yarn`** — chỉ dùng `pnpm`

---

## 3. Checklist trang admin mới

```
[ ] Tạo file service tại services/<feature>.service.ts
[ ] Thêm auth headers cho mọi mutating request
[ ] Tạo page tại app/admin/<feature>/page.tsx
[ ] Thêm "use client" directive
[ ] Thêm loading state (useState isLoading)
[ ] Thêm error state + hiển thị lỗi cho user
[ ] Dùng toast (sonner) cho success/error notifications
[ ] Thêm route vào Sidebar nếu cần (components/admin/Sidebar.tsx)
[ ] Kiểm tra role-based access nếu chỉ SUPER_ADMIN mới được vào
```

---

## 4. Pattern xử lý loading + error

```typescript
const [isLoading, setIsLoading] = useState(false);

const handleAction = async () => {
  setIsLoading(true);
  try {
    await FeatureService.doSomething(data);
    toast.success("Thành công!");
    router.push("/admin/<feature>");
  } catch (e: any) {
    toast.error(e.message || "Có lỗi xảy ra");
  } finally {
    setIsLoading(false);
  }
};
```

---

## 5. Upload file / media

Luôn upload qua `MediaService.uploadSingle()` từ `services/media.service.ts`:

```typescript
import { MediaService } from "@/services/media.service";

const response = await MediaService.uploadSingle(file);
const media = Array.isArray(response.data) ? response.data[0] : response.data;
const url = media.url; // URL dùng để lưu vào DB
```

Với batch upload vào album: dùng `GalleryService.uploadBatchMedia(albumId, files, onProgress)`.

---

## 6. Auth guard

`AdminLayoutClient` đã tự động redirect về `/admin/login` nếu không có token.
Nếu muốn chặn theo role, dùng pattern sau trong page:

```typescript
import { getUserInfo } from "@/lib/auth";

const user = getUserInfo();
if (user?.role !== "SUPER_ADMIN") {
  router.push("/admin");
  return;
}
```

---

## 7. User info

Sau khi login, user info được lưu trong `localStorage` key `userInfo`:

```typescript
import { getUserInfo, type UserInfo } from "@/lib/auth";

const user = getUserInfo(); // { id, email, name, role }
```

Luôn đọc trong `useEffect` để tránh hydration mismatch:

```typescript
const [user, setUser] = useState<UserInfo | null>(null);
useEffect(() => { setUser(getUserInfo()); }, []);
```
