# Backend Rules — NestJS + Prisma

## Stack
- **Framework:** NestJS 11
- **ORM:** Prisma 5.22
- **Database:** PostgreSQL 16
- **Schema:** `server/prisma/schema.prisma`

## PrismaService

Luôn inject `PrismaService` từ `server/src/prisma/prisma.service.ts` — không dùng raw SQL hay query trực tiếp.

```typescript
// Trong module của bạn
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class YourService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.yourModel.findMany();
  }
}
```

Import module:
```typescript
// Trong module file — PrismaModule đã được import ở AppModule, không cần import lại
// Chỉ cần thêm PrismaService vào providers nếu cần
```

## Prisma Commands

```bash
cd server

# Generate Prisma client (sau khi thay đổi schema)
pnpm exec prisma generate

# Tạo migration mới (dev)
pnpm exec prisma migrate dev --name <tên_migration>

# Apply migrations (production)
pnpm exec prisma migrate deploy

# Reset DB và re-seed (dev only)
pnpm exec prisma migrate reset

# Push schema trực tiếp không tạo migration (prototyping)
pnpm exec prisma db push

# Seed data (tạo admin user)
pnpm exec prisma db seed

# Mở Prisma Studio
pnpm exec prisma studio
```

## Schema Conventions

### Models hiện có
| Model | Mục đích |
|-------|----------|
| User | Tài khoản, roles (SUPER_ADMIN, EDITOR, AUTHOR) |
| Article | Bài viết NEWS/EVENT, có slug, SEO fields |
| Media | File lưu trong MinIO, có key reference |
| MediaAlbum | Album ảnh, nhóm Media |
| FormDefinition | Form động liên kết với Article EVENT |
| FormField | Các field của form |
| FormSubmission | Dữ liệu submit của form |
| AuditLog | Log tự động cho UPDATE/DELETE |
| Milestone | Mốc lịch sử cho timeline 25 năm |
| Achievement | Thành tựu của khoa |
| Alumni | Cựu sinh viên |

### Thêm model mới
1. Thêm vào `schema.prisma`
2. Chạy `pnpm exec prisma migrate dev --name add_<model_name>`
3. Chạy `pnpm exec prisma generate`
4. Tạo module NestJS: `module`, `service`, `controller`, `dto/`

## Audit Middleware

`PrismaService` có middleware tự động log **UPDATE** và **DELETE** vào bảng `AuditLog`. Không cần làm thêm gì — chỉ cần dùng PrismaService bình thường.

Nếu cần log CREATE, dùng `AuditLogInterceptor` trong `server/src/common/interceptors/`.

## Validation

Dùng `class-validator` + `class-transformer` qua DTO:

```typescript
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
```

`ValidationPipe` đã được set global trong `main.ts` — tự động validate tất cả request bodies.

## Environment Variables (Backend)

```
DATABASE_URL       # PostgreSQL connection string
JWT_SECRET         # JWT signing secret
JWT_EXPIRATION     # Token expiry (default: 7d)
REDIS_HOST         # Redis hostname
REDIS_PORT         # Redis port
REDIS_PASSWORD     # Redis password
MINIO_ENDPOINT     # MinIO hostname
MINIO_PORT         # MinIO port
MINIO_USE_SSL      # true/false
MINIO_ACCESS_KEY   # MinIO access key
MINIO_SECRET_KEY   # MinIO secret key
MINIO_BUCKET_NAME  # Bucket name
```
