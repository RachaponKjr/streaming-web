FROM tiangolo/nginx-rtmp

# Copy ไฟล์ config เข้าไปทับ
COPY nginx.conf /etc/nginx/nginx.conf

# สร้างโฟลเดอร์สำหรับเก็บไฟล์ HLS
RUN mkdir -p /tmp/hls && chmod -R 777 /tmp/hls