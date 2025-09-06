import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CheckoutCommand } from '../impls/checkout.command';
import { CartResponseDto } from '../../dto/response/cart-response.dto';
import { CartService } from '../../services/cart.service';
import { Message } from '../../enums/notification';
@CommandHandler(CheckoutCommand)
export class CheckoutHandler implements ICommandHandler<CheckoutCommand> {
  constructor(private readonly productsService: CartService) {}
  async execute(command: CheckoutCommand): Promise<CartResponseDto> {
    const username = command.username;
    const cart = await this.productsService.Order(username);
    const raw = {
      status: HttpStatus.OK,
      message: Message.PROCESSING,
      cart 
    }
    const response = plainToInstance(CartResponseDto, raw, {excludeExtraneousValues:true});
    return response;
  }
}