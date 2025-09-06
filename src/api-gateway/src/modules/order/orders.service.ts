import { Injectable, Inject, OnModuleInit  } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { OrderServiceGrpc } from './order-service-grpc';

@Injectable()
export class OrdersService implements OnModuleInit{
  private orderService: OrderServiceGrpc;
  constructor(
    @Inject('ORDER_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.orderService = this.client.getService<OrderServiceGrpc>('OrderService');
  }

  getOrders(username: string) {  
    return this.orderService.getOrders({username});
  }

  getOrderById(username: string, id: string){
    return this.orderService.getOrderById({username, id});
  }

  Checkout(username: string, method: string){
    return this.orderService.Checkout({username, method});
  }

  updateStatusOrder(id: string, status: any) {
    return this.orderService.updateStatusOrder({id, status})
  }

}
