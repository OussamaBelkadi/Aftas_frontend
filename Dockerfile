FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY dist/your-app-name/* ./

# Use a lightweight image for the final container
FROM nginx:1.24.2-alpine

COPY --from=builder /app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
