import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../impls/create-order.command';
import { OrderRequestDto } from '../../dto/request/order.request.dto';
import { DetailOrderResponseDto } from '../../dto/response/detail-order-response.dto';
import { OrdersService } from '../../services/orders.service';
import { Message } from '../../enums/notifications';
@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(private readonly ordersService: OrdersService) {}
  async execute(command: CreateOrderCommand): Promise<DetailOrderResponseDto> {
    const data: OrderRequestDto = command.data;
    const order = await this.ordersService.createOrder(data);
    const raw = {
      status: HttpStatus.OK,
      message: Message.CREATE_SUCCESSFULLY,
      order 
    }
    const response = plainToInstance(DetailOrderResponseDto, raw,{excludeExtraneousValues:true});
    return response;
  }
}