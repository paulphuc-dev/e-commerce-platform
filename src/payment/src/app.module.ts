import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [PaymentModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
