import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckoutCommand } from '../impls/checkout.command';
import { CheckoutResponse } from '../../dto/response/checkout-response.dto';
import { OrdersService } from '../../services/orders.service';
import { Message } from '../../enums/notifications';
@CommandHandler(CheckoutCommand)
export class CheckoutHandler implements ICommandHandler<CheckoutCommand> {
  constructor(private readonly ordersService: OrdersService) {}
  async execute(command: CheckoutCommand): Promise<CheckoutResponse> {
    const username: string = command.username;
    const method: string = command.method;
    const notification = await this.ordersService.Checkout(username, method);
    const raw = {
      status: HttpStatus.OK,
      message: Message.CREATE_SUCCESSFULLY,
      notification 
    }
    const response = plainToInstance(CheckoutResponse, raw,{excludeExtraneousValues:true});
    return response;
  }
}