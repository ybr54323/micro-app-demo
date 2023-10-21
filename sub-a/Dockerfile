FROM node:14.18.0-alpine3.14 AS builder

WORKDIR /app

COPY . .

RUN npm install --registry=https://registry.npm.taobao.org && npm run build

FROM nginx:1.21.3-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

