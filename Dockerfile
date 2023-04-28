# Dockerfile



# Stage 1 - Install Flutter
FROM ubuntu:latest as flutter
RUN apt-get update && \
    apt-get install -y curl git unzip xz-utils zip libglu1-mesa

# Download and install Flutter
RUN git clone https://github.com/flutter/flutter.git /usr/local/flutter
ENV PATH "$PATH:/usr/local/flutter/bin"


# Sử dụng image nodejs có phiên bản LTS mới nhất làm base
FROM node:lts-alpine

# Thư mục làm việc là /app
WORKDIR /app

# Sao chép toàn bộ mã nguồn vào /app
COPY . .
COPY --from=flutter /usr/local/flutter /usr/local/flutter
ENV PATH "$PATH:/usr/local/flutter/bin"

# Cài đặt các dependencies cho mobile
# WORKDIR /app/mezone_mobile
# RUN flutter pub get

# # Cài đặt các dependencies cho web
# WORKDIR /app/mezone_web
# RUN npm install

# # Cài đặt các dependencies cho server
# WORKDIR /app/mezone_server
# RUN npm install

# Build ứng dụng ReactJS
WORKDIR /app/mezone_web
RUN npm run build

# Chạy ứng dụng
CMD ["npm", "start"]

# Expose port 3030 cho phía server
EXPOSE 3030

# Expose port 3000 cho phía web
EXPOSE 3000