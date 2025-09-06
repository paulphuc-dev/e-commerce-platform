import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Transport,ClientsModule } from '@nestjs/microservices';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { RedisService } from './services/redis.service';
import { CheckoutHandler } from './commands/handler/checkout.handler';
import { AddToCartHandler } from './commands/handler/add-to-cart.handler';
import { GetCartHandler } from './queries/handler/get-cart.handler';
import { 
  DESTINATION_SERVICE,
  DESTINATION_URL,
  DESTINATION_QUEUE
 } from './constant';

const CommandHandler = [
  CheckoutHandler,
  AddToCartHandler
];

const QueryHandler = [
  GetCartHandler
]; 

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: DESTINATION_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [DESTINATION_URL],
          queue: DESTINATION_QUEUE,
          queueOptions: { 
            durable: true, 
          },
        },
      },
    ])
  ],
  controllers: [CartController],
  providers: [
    ...CommandHandler,
    ...QueryHandler,
    CartService,
    RedisService
  ]
})
export class CartModule {
  constructor() {
    console.log('✅ Basket Module loaded !');
  }
}
