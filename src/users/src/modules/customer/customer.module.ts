import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { CustomerSchema } from './schema/customer.schema';
import { CreateCustomerHandler } from './commands/handler/create-customer.handler';
import { UpdateCustomerHandler } from './commands/handler/update-customer.handler';
import { GetCustomersHandler } from './queries/handler/get-customer.handler';
import { GetCustomerByIdHandler } from './queries/handler/get-customer-by-id.handler';
import { AccountModule } from '../account/account.module';
const CommandHandlers = [
  CreateCustomerHandler,
  UpdateCustomerHandler
];

const QueryHandlers = [
  GetCustomersHandler,
  GetCustomerByIdHandler,
];

@Module({
  imports: [
    CqrsModule,
    AccountModule,
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
    ])
  ],
  controllers: [CustomerController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    CustomerService
  ],
  exports: [CustomerService]
})
export class CustomerModule {}