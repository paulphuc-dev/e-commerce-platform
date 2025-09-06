import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { 
  PRODUCT_NAME,
  PRODUCT_PKG,
  PRODUCT_URL,
  PRODUCT_PROTOPATH,
  PRODUCT_PROTO,
  PRODUCT_PROTOBUF
 } from './constant';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_NAME,
        transport: Transport.GRPC,
        options: {
          package: PRODUCT_PKG,
          protoPath: join(__dirname, PRODUCT_PROTOPATH),
          loader: {
            includeDirs: [
              join(__dirname, PRODUCT_PROTO), // Thư mục chứa order.proto
              join(__dirname, PRODUCT_PROTOBUF), // <-- thư viện chứa google/protobuf/*.proto
            ],
          },
          url: PRODUCT_URL
        },
      }
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
