# Dev Tooling Rules — pnpm

## Package Manager: pnpm (bắt buộc)

Dự án dùng **pnpm** làm package manager duy nhất. Không dùng `npm` hay `yarn`.

### Install
```bash
pnpm install          # root (cài tất cả workspace)
pnpm install          # trong client/ hoặc server/
```

### Add package
```bash
pnpm add <package>                        # trong thư mục package đó
pnpm add -D <package>                     # devDependency
pnpm add <package> --filter web           # thêm vào app web từ client/ root
pnpm add <package> --filter @workspace/ui # thêm vào shared UI package
```

### Workspace commands (chạy từ `client/` root)
```bash
pnpm --filter web <command>           # Chạy command trong apps/web
pnpm --filter @workspace/ui <command> # Chạy command trong packages/ui
pnpm dev                              # Turbopack dev (tất cả apps)
pnpm build                            # Turborepo build
pnpm lint                             # Lint tất cả
pnpm typecheck                        # Type check tất cả
```

### Server commands (chạy từ `server/`)
```bash
pnpm run start:dev    # NestJS dev watch mode
pnpm run build        # Production build
pnpm run start:prod   # Start production
pnpm run lint         # Lint
```

## Quy tắc

- Không tạo `package-lock.json` hay `yarn.lock` — commit sẽ bị reject
- Không dùng `npx`, dùng `pnpm dlx` hoặc `pnpm exec` thay thế
- Lock file: `pnpm-lock.yaml` — luôn commit file này
- Node version: >= 20 (xem `.nvmrc` hoặc `engines` trong package.json)
- pnpm version: 10.x (được pin trong `packageManager` field)

## Turborepo (client/)

- Config tại `client/turbo.json`
- Cache tự động cho `build`, `lint` tasks
- `.next/**` là output được cache
- `$TURBO_DEFAULT$ + .env*` là inputs
