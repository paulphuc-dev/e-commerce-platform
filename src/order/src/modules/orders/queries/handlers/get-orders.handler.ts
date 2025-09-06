import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrdersQuery } from '../impls/get-orders.query';
import { OrdersService } from '../../services/orders.service';
import { OrderResponseDto } from '../../dto/response/order-response.dto';
import { Message } from '../../enums/notifications';
@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {

  constructor(private readonly orderService: OrdersService) {}
  async execute(query: GetOrdersQuery): Promise<OrderResponseDto> {
    const { username } = query;
    const orders = await this.orderService.getOrders(username);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_ALL_SUCCESSFULLY,
      orders
    };
    const response = plainToInstance(OrderResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response
  }
}
