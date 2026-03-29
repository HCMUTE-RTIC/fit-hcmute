# Giai đoạn chạy production (Runner)
FROM node:22-slim

WORKDIR /app

# Cài đặt openssl (Yêu cầu bắt buộc của Prisma)
RUN apt-get update && apt-get install -y --no-install-recommends openssl ca-certificates && rm -rf /var/lib/apt/lists/*

# Cài đặt pnpm
RUN npm install -g pnpm@10

# Context của build này là thư mục server/
# Nên COPY . . sẽ copy toàn bộ nội dung trong server/
# (Bao gồm cả thư mục dist/ đã được Github Actions build sẵn)
COPY . .

# Cài đặt thư viện production (bỏ qua devDependencies)
ENV CI=true
RUN pnpm install --prod --frozen-lockfile

# Sinh Prisma Client một lần nữa trong container (tránh lỗi binary / wasm khác môi trường)
RUN pnpm dlx prisma@5.22.0 generate

# NestJS chạy ở port 3000, Map ra 3001 ở docker-compose
EXPOSE 3000

CMD ["sh", "-c", "pnpm dlx prisma@5.22.0 migrate deploy && node dist/src/main.js"]
