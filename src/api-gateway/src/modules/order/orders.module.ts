import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { 
  ORDER_NAME,
  ORDER_PKG,
  ORDER_URL,
  ORDER_PROTOPATH,
  ORDER_PROTO,
  ORDER_PROTOBUF
 } from './constant';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_NAME,
        transport: Transport.GRPC,
        options: {
          package: ORDER_PKG,
          protoPath: join(__dirname, ORDER_PROTOPATH),
          loader: {
            includeDirs: [
              join(__dirname, ORDER_PROTO), // Thư mục chứa order.proto
              join(__dirname, ORDER_PROTOBUF), // <-- thư viện chứa google/protobuf/*.proto
            ],
          },
          url: ORDER_URL
        },
      }
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
