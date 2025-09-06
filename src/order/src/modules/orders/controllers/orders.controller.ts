import { Controller, BadRequestException } from '@nestjs/common';
import { GrpcMethod, EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrderException, OrderStatus } from '../enums/notifications';
import { GetOrdersQuery } from '../queries/impls/get-orders.query';
import { GetOrderByIdQuery } from '../queries/impls/get-order-by-id.query';
import { CreateOrderCommand } from '../commands/impls/create-order.command';
import { UpdateStatusOrderCommand } from '../commands/impls/update-status-order.command';
import { CheckoutCommand } from '../commands/impls/checkout.command';
@Controller()
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus, 
    private readonly queryBus: QueryBus
  ){}
  
  @GrpcMethod('OrderService', 'GetOrders')
  async getOrders(data: { username: string }) {
    return this.queryBus.execute(new GetOrdersQuery(data.username));
  }
  
  @GrpcMethod('OrderService','GetOrderById')
  async getOrderById(data: {username: string, id: string }){
    return this.queryBus.execute(new GetOrderByIdQuery(data.username, data.id));
  }

  @GrpcMethod('OrderService','UpdateStatusOrder')
  async updateStatusOrder(data: { id: string, status: string }) {
    const status = data.status as OrderStatus;
    if (!['pending', 'processing' ,'delivered', 'cancelled'].includes(status)) {
      throw new BadRequestException(OrderException.STATUS);
    }
    return this.commandBus.execute(new UpdateStatusOrderCommand(data.id, data.status));
  }

  @GrpcMethod('OrderService', 'Checkout')
  async Checkout(data: {username: string, method: string}){
    return this.commandBus.execute(new CheckoutCommand(data.username, data.method));
  }
  
  @EventPattern('order.checkout')
  async handleOrderCheckout(@Payload() cartData: any) {
    return this.commandBus.execute(new CreateOrderCommand(cartData));
  }
}
