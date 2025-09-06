Các công nghệ hỗ trợ:
CQRS  X
JWT   X
Dùng Docker X
Dùng GRPC X
Dùng Nats & RabitMQ X
Dùng Redis để lưu tạm X
Tích hợp Momo X
Thiết lập rate-limit X
Dùng Cloudinary lưu file 
Dùng Nginx Reverse Proxy 
Dùng Jenkin cho CICD
Dùng Kubernates điều phối container
Gửi hóa đơn qua mail
Load Balancing
Có https

CSDL SqlServer & MongoDb

Tạo file migration 
  npm run migration:create --name=initial         khi chưa có entity 
  npm run migration:generate --name=initial       khi có entity
Chạy migration 
  npm run migration:run

Xóa migration
  npm run migration:revert


https://localhost:3001/