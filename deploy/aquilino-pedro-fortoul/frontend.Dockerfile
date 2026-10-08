FROM english-platform-frontend:latest AS builder
COPY . /app
RUN npm ci --no-audit --no-fund && npm test -- --run && npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
