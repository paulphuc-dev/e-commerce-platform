import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOrderByIdQuery } from '../impls/get-order-by-id.query';
import { OrdersService } from '../../services/orders.service';
import { DetailOrderResponseDto } from '../../dto/response/detail-order-response.dto';
import { Message } from '../../enums/notifications';
@QueryHandler(GetOrderByIdQuery)
export class GetOrderByIdHandler implements IQueryHandler<GetOrderByIdQuery> {
  constructor(private readonly orderService: OrdersService) {}

  async execute(query: GetOrderByIdQuery): Promise<DetailOrderResponseDto> {
    const { username, id } = query;
    const order = await this.orderService.getOrderById(username, id);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_BY_ID_SUCCESSFULLY,
      order
    }
    const response = plainToInstance(DetailOrderResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response; 
  }
}
