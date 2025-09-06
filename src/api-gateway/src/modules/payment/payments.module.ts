import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { 
  PAYMENT_NAME, 
  PAYMENT_PKG,
  PAYMENT_URL,
  PAYMENT_PROTOPATH,
  PAYMENT_PROTO,
  PAYMENT_PROTOBUF
} from './constant';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_NAME,
        transport: Transport.GRPC,
        options: {
          package: PAYMENT_PKG,
          protoPath: join(__dirname, PAYMENT_PROTOPATH),
          loader: {
            includeDirs: [
              join(__dirname, PAYMENT_PROTO),     // Thư mục chứa order.proto
              join(__dirname, PAYMENT_PROTOBUF), // <-- thư viện chứa google/protobuf/*.proto
            ],
          },
          url: PAYMENT_URL
        },
      }
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
