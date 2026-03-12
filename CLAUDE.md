# FIT HCMUTE 25 Year Anniversary — Project Guide

## Overview

Website kỷ niệm 25 năm thành lập Khoa CNTT, Trường ĐH Sư phạm Kỹ thuật TP.HCM (HCMUTE).

- **Frontend:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4
- **Backend:** NestJS 11 + Prisma 5 + PostgreSQL 16
- **Storage:** MinIO (self-hosted S3)
- **Cache:** Redis 7
- **Build:** Turborepo + pnpm 10
- **Deploy:** Docker Compose + Nginx (self-hosted)

---

## Monorepo Structure

```
fit-hcmute/
├── client/                        # Frontend monorepo (Turborepo)
│   ├── apps/web/                  # Next.js app (port 3001 dev, 3000 prod)
│   │   ├── app/                   # App Router pages
│   │   │   ├── (public)/          # Public routes
│   │   │   └── admin/             # Protected admin routes
│   │   ├── components/            # App-specific components
│   │   ├── services/              # API service layer (fetch wrappers)
│   │   └── lib/auth.ts            # JWT helpers (getAuthToken, setAuthToken)
│   └── packages/
│       ├── ui/                    # Shared Shadcn + MagicUI components
│       ├── eslint-config/
│       └── typescript-config/
├── server/                        # NestJS backend
│   ├── src/
│   │   ├── main.ts                # Entry: port 3000, /api prefix, CORS
│   │   ├── app.module.ts
│   │   ├── auth/                  # JWT + Passport
│   │   ├── users/                 # CRUD + RBAC
│   │   ├── articles/              # News/Events + cache invalidation
│   │   ├── albums/                # Photo albums
│   │   ├── media/                 # MinIO file upload
│   │   ├── forms/                 # Dynamic form builder
│   │   ├── audit-logs/            # Audit trail
│   │   ├── prisma/                # PrismaService + audit middleware
│   │   └── common/                # Redis cache, interceptors, utils
│   └── prisma/
│       └── schema.prisma          # DB schema
├── deploy/
│   └── nginx/default.conf         # Nginx reverse proxy config
├── docs/                          # Architecture, ERD, features docs
├── docker-compose.dev.yml         # Dev: postgres, redis, minio
├── docker-compose.prod.yml        # Prod: all services incl. app containers
└── .github/workflows/ci-cd.yml    # CI/CD: build + deploy to self-hosted
```

---

## Dev Commands

> **Package manager: pnpm** — xem `.claude/rules/dev-tooling.md`

### Frontend (client/)
```bash
cd client
pnpm install
pnpm dev          # Turbopack dev server
pnpm build        # Production build
pnpm typecheck    # Type check
pnpm lint         # Lint
```

### Backend (server/)
```bash
cd server
pnpm install
pnpm exec prisma generate     # Generate Prisma client
pnpm exec prisma migrate dev  # Create & run migration
pnpm exec prisma db seed      # Seed admin user
pnpm run start:dev            # NestJS watch mode
pnpm run build                # Production build
```

### Docker (dev services)
```bash
# Start postgres, redis, minio
docker-compose -f docker-compose.dev.yml up -d

# Stop
docker-compose -f docker-compose.dev.yml down
```

---

## Environment Variables

### Frontend (`client/apps/web/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Backend (`server/.env` or `.env.development`)
```
DATABASE_URL="postgresql://hcmute_dev:admin123@localhost:5432/fit_25years_dev?schema=public"
JWT_SECRET=fit_hcmute_secret_2025
JWT_EXPIRATION=7d
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=dev_redis_pass_123
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=admin_minio
MINIO_SECRET_KEY=admin_minio_pass
MINIO_BUCKET_NAME=fit-25-media-dev
```

---

## Key Conventions

### API
- Prefix: `/api` (tất cả endpoints)
- Auth endpoints: `POST /api/auth/login`
- Resource endpoints: `GET /api/v1/users`, `GET /api/articles`, ...
- JWT: Bearer token trong `Authorization` header
- Token payload: `{ email, sub: userId, role }`

### RBAC Roles
| Role | Quyền |
|------|-------|
| SUPER_ADMIN | Toàn quyền, xem audit logs |
| EDITOR | CRUD articles, quản lý media library |
| AUTHOR | Chỉ quản lý bài viết của bản thân |

### MinIO / Media
- Xem chi tiết: `.claude/rules/media-minio.md`
- Public URL: `/media_storage/{bucketName}/{key}` (Nginx proxy)
- Key format: `{timestamp}_{uuid}.{ext}`

### Database
- Xem chi tiết: `.claude/rules/backend-prisma.md`
- Audit logs tự động cho UPDATE/DELETE qua PrismaService middleware

### Frontend Auth
- Token lưu trong `localStorage` key `accessToken`
- Helper: `lib/auth.ts` — `getAuthToken()`, `setAuthToken()`, `removeAuthToken()`, `getAuthHeaders()`

---

## Deployment

### Production
```bash
# CI/CD tự động trên push vào main
# Hoặc deploy thủ công:
cp /home/sysadmin/env/.env.production .env.production
docker compose -f docker-compose.prod.yml up -d --build
```

### URLs Production
- Frontend: `https://25nam.fit.hcmute.edu.vn`
- API: `https://api25nam.fit.hcmute.edu.vn`
- Media: `https://api25nam.fit.hcmute.edu.vn/media_storage/`
- MinIO console: `https://api25nam.fit.hcmute.edu.vn/minio-panel/`

---

## Rules
- [`.claude/rules/dev-tooling.md`](.claude/rules/dev-tooling.md) — Package manager (pnpm)
- [`.claude/rules/backend-prisma.md`](.claude/rules/backend-prisma.md) — Prisma ORM conventions
- [`.claude/rules/media-minio.md`](.claude/rules/media-minio.md) — MinIO media storage
