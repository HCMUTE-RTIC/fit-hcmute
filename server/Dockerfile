# Giai đoạn chạy production (Runner)
FROM node:24-alpine

WORKDIR /app

# Cài đặt openssl (Yêu cầu bắt buộc của Prisma trên Alpine Linux)
RUN apk add --no-cache openssl ca-certificates

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
