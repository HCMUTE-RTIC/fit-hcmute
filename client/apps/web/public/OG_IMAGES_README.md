# Open Graph Images Guide

## Required Images

Để đảm bảo Open Graph hoạt động tốt trên các nền tảng mạng xã hội, cần chuẩn bị các file ảnh sau trong thư mục `public/`:

### 1. **og-image.jpg** (Main Open Graph Image)
- **Kích thước:** 1200 x 630px
- **Format:** JPG hoặc PNG
- **Dung lượng:** < 1MB
- **Nội dung:** Logo FIT-HCMUTE + tên trường + slogan
- **Sử dụng cho:** Facebook, LinkedIn, các nền tảng hỗ trợ Open Graph

### 2. **twitter-image.jpg** (Twitter Card Image)
- **Kích thước:** 1200 x 630px (hoặc 1200 x 675px)
- **Format:** JPG hoặc PNG
- **Dung lượng:** < 1MB
- **Nội dung:** Tương tự og-image.jpg
- **Sử dụng cho:** Twitter/X

### 3. **apple-touch-icon.png** (Optional)
- **Kích thước:** 180 x 180px
- **Format:** PNG
- **Sử dụng cho:** iOS Safari bookmark icon

### 4. **favicon.ico**
- **Kích thước:** 32 x 32px hoặc 16 x 16px
- **Format:** ICO
- **Sử dụng cho:** Browser tab icon

## Page-Specific Images (Optional)

Có thể tạo OG images riêng cho từng page:

```
public/
├── og-image.jpg (default)
├── og-gioi-thieu.jpg
├── og-tin-tuc.jpg
├── og-thu-vien.jpg
└── ...
```

## Tạo OG Image với Next.js Image Generation

Thay vì tạo ảnh tĩnh, có thể sử dụng `opengraph-image.tsx` để tự động generate:

```typescript
// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'FIT HCMUTE';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        display: 'flex',
        fontSize: 60,
        background: 'linear-gradient(to bottom, #0066cc, #0052a3)',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
      }}>
        Khoa Công nghệ Thông tin - FIT HCMUTE
      </div>
    ),
    { ...size }
  );
}
```

## Testing Tools

- **Facebook Debugger:** https://developers.facebook.com/tools/debug/
- **Twitter Card Validator:** https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector:** https://www.linkedin.com/post-inspector/
- **Open Graph Preview:** https://www.opengraph.xyz/

## Current Status

✅ Metadata configuration added
⚠️ **TODO:** Create actual image files (og-image.jpg, twitter-image.jpg)

You can use existing logo: `public/logo-50-nam-4x.png` as a base for creating OG images.
