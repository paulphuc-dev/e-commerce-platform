import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { 
  CART_NAME,
  CART_PKG,
  CART_URL,
  CART_PROTOPATH,
  CART_PROTO,
  CART_PROTOBUF
 } from './constant';
@Module({
  imports: [
    ClientsModule.register([
      {
          name: CART_NAME,
          transport: Transport.GRPC,
          options: {
            package: CART_PKG,
            protoPath: join(__dirname, CART_PROTOPATH),
            loader: {
            includeDirs: [
              join(__dirname, CART_PROTO), // Thư mục chứa order.proto
              join(__dirname, CART_PROTOBUF), // <-- thư viện chứa google/protobuf/*.proto
            ],
          },
          url: CART_URL
        },
      }
    ]),
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
