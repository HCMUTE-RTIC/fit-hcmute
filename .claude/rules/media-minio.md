# Media Storage Rules — MinIO

## Overview

Tất cả file media (ảnh, video, PDF, attachment) được lưu trong **MinIO** — self-hosted S3-compatible object storage.

- Dev: `localhost:9000` (API), `localhost:9001` (console)
- Prod: internal Docker network, exposed qua Nginx

## Buckets

| Environment | Bucket Name |
|-------------|-------------|
| Development | `fit-25-media-dev` |
| Production | `media-fit` |

Cả hai bucket đều có **public anonymous read access**.

## Upload Flow

1. Frontend gửi `multipart/form-data` lên backend
2. NestJS `MediaService` (`server/src/media/`) nhận file qua Multer
3. `MediaService` upload lên MinIO với key được generate tự động
4. Metadata (key, url, category, size...) được lưu vào bảng `Media` trong PostgreSQL
5. Response trả về object `Media` với `url` để frontend dùng

**Không upload trực tiếp từ frontend lên MinIO** — luôn đi qua backend API.

## Key Format

```
{timestamp}_{uuid}.{ext}
```

Ví dụ: `1710000000000_550e8400-e29b-41d4-a716-446655440000.jpg`

## Public URL Pattern

```
/media_storage/{bucketName}/{key}
```

Ví dụ (dev):
```
http://localhost:3001/media_storage/fit-25-media-dev/1710000000000_abc123.jpg
```

Ví dụ (prod):
```
https://api25nam.fit.hcmute.edu.vn/media_storage/media-fit/1710000000000_abc123.jpg
```

URL này được Nginx proxy đến MinIO S3 endpoint.

## MediaCategory Enum

```typescript
enum MediaCategory {
  IMAGE        // Ảnh thông thường
  VIDEO        // Video
  PDF_YEARBOOK // PDF kỷ yếu
  ATTACHMENT   // File đính kèm khác
}
```

## API Endpoints

```
POST /api/media/upload        # Upload 1 file
POST /api/media/upload-batch  # Upload nhiều file cùng lúc
DELETE /api/media/:id         # Xóa file (xóa cả trên MinIO và DB)
GET /api/albums               # Danh sách albums
POST /api/albums              # Tạo album
```

## Backend: MediaService

```typescript
// server/src/media/media.service.ts
// Inject MinioService và PrismaService

// Upload file
const media = await mediaService.uploadFile(file, category, albumId?);
// Returns: Media { id, key, url, category, size, mimetype, ... }

// Delete file
await mediaService.deleteFile(mediaId);
// Xóa cả trên MinIO và record trong DB
```

## Environment Variables

Không hardcode endpoint hay credentials — luôn dùng env:

```
MINIO_ENDPOINT=localhost          # Dev: localhost, Prod: minio_prod (Docker service name)
MINIO_PORT=9000
MINIO_USE_SSL=false               # Dev: false, Prod: false (SSL handled by Nginx)
MINIO_ACCESS_KEY=admin_minio
MINIO_SECRET_KEY=admin_minio_pass
MINIO_BUCKET_NAME=fit-25-media-dev
```

## Docker Dev Setup

MinIO được start qua `docker-compose.dev.yml`:

```bash
docker-compose -f docker-compose.dev.yml up -d
# MinIO API:     http://localhost:9000
# MinIO Console: http://localhost:9001
# Login:         admin_minio / admin_minio_pass
```

Bucket `fit-25-media-dev` được tự động tạo khi start.

## Batch Upload (Frontend)

Frontend component `BatchUpload` (`client/apps/web/components/admin/`) hỗ trợ upload nhiều file:

```typescript
// Dùng services/media.service.ts
import { uploadBatch } from '@/services/media.service';

const results = await uploadBatch(files, MediaCategory.IMAGE);
```
