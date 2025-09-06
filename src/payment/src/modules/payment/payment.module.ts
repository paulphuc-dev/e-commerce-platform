import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule} from '@nestjs/axios';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './controllers/payment.controller';
import { PaymentService } from './services/payment.service';
import { CreatePaymentHandler } from './commands/handlers/create-payment.handler';
import { GetPaymentsHandler } from './queries/handlers/get-payments.handler';
import { GetPaymentByIdHandler } from './queries/handlers/get-payment-by-id.handler';
const CommandHandlers = [
  CreatePaymentHandler
];

const QueryHandlers = [
  GetPaymentsHandler,
  GetPaymentByIdHandler,
];
@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    CqrsModule, 
    HttpModule
  ],
  controllers: [PaymentController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    PaymentService
  ],
})
export class PaymentModule {
  constructor() {
    console.log('✅ Payment Module loaded !');
  }
}
