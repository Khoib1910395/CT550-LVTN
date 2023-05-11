# Dockerfile

# Sử dụng image nodejs có phiên bản LTS mới nhất làm base
FROM node:lts-alpine

# Thư mục làm việc là /app
WORKDIR /app

# Sao chép toàn bộ mã nguồn vào /app
COPY . .

# # Cài đặt các dependencies cho mobile
# WORKDIR /app/mezone_mobile
# RUN npm install

# Cài đặt các dependencies cho web
WORKDIR /app/mezone_web
RUN npm install -g npm@9.6.6
RUN npm install --legacy-peer-deps

# Cài đặt các dependencies cho server
WORKDIR /app/mezone_server
RUN npm install -g npm@9.6.6
RUN npm install

# Build ứng dụng ReactJS
WORKDIR /app/mezone_web
RUN npm run build

# # Chạy ứng dụng
# CMD ["npm", "run", "start"]

CMD ["sh", "-c", "cd /app/mezone_server && npm start & cd /app/mezone_web && npm start"]

# Expose port 3030 cho phía server
EXPOSE 3030

# Expose port 3000 cho phía web
EXPOSE 3000
