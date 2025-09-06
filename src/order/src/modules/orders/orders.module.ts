import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-items.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';
import { CreateOrderHandler } from './commands/handlers/create-order.handler';
import { GetOrdersHandler } from './queries/handlers/get-orders.handler';
import { UpdateStatusOrderHandler } from './commands/handlers/update-status-order.handler';
import { GetOrderByIdHandler } from './queries/handlers/get-order-by-id.handler';
import { CheckoutHandler } from './commands/handlers/checkout.handler';
import { 
  SERVICE,
  SERVER,
} from '../../constant';

const CommandHandlers = [
  CreateOrderHandler,
  UpdateStatusOrderHandler,
  CheckoutHandler
];

const QueryHandlers = [
  GetOrdersHandler,
  GetOrderByIdHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]), 
    CqrsModule,
    ClientsModule.register([
      {
        name: SERVICE,
        transport: Transport.NATS,
        options: {
          servers: [SERVER],
        },
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    OrdersService
  ],
})
export class OrdersModule {
  constructor() {
    console.log('✅ Orders Module loaded !');
  }
}