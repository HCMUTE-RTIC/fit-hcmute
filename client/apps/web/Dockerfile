FROM node:24-alpine

WORKDIR /app

# Cài pnpm global
RUN npm install -g pnpm@10

# Context của Docker Build này là thư mục ROOT (./)
# Ta copy toàn bộ thư mục client/ (đã được bao gồm thư mục .next/ do Github Action build)
COPY client/ ./client/

WORKDIR /app/client

# Cài đặt toàn bộ dependencies trong Turborepo nhưng chỉ ở mức Production
RUN pnpm install --prod

# NextJS app (web) chạy port 3000 ở default
EXPOSE 3000

# Chạy next start thông qua lệnh script của turborepo
CMD ["pnpm", "--filter", "web", "start"]
