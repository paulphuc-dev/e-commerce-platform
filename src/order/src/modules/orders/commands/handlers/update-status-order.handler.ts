import { plainToInstance } from 'class-transformer';
import { BadRequestException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderStatus, OrderException } from '../../enums/notifications';
import { UpdateStatusOrderCommand } from '../impls/update-status-order.command';
import { DetailOrderResponseDto } from '../../dto/response/detail-order-response.dto';
import { OrdersService } from '../../services/orders.service';
import { Message } from '../../enums/notifications';
@CommandHandler(UpdateStatusOrderCommand)
export class UpdateStatusOrderHandler implements ICommandHandler<UpdateStatusOrderCommand> {
  constructor(private readonly ordersService: OrdersService) {}
  async execute(command: UpdateStatusOrderCommand): Promise<DetailOrderResponseDto> {
    const id: string = command.id;
    const status = command.status as OrderStatus; 
    if (!['pending', 'processing' ,'delivered', 'cancelled'].includes(status)) {
        throw new BadRequestException(OrderException.STATUS);
    }
    const order = await this.ordersService.updateOrderStatus(id, status);
    const raw = {
      status: HttpStatus.OK,
      message: Message.UPDATE_SUCCESSFULLY,
      order
    }
    const response = plainToInstance(DetailOrderResponseDto, raw,{excludeExtraneousValues: true});
    return response;
  }
}