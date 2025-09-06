import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddToCartCommand } from '../impls/add-to-cart.command';
import { CartDetailDto } from '../../dto/request/cart-detail.dto';
import { CartResponseDto } from '../../dto/response/cart-response.dto';
import { CartService } from '../../services/cart.service';
import { Message } from '../../enums/notification';
@CommandHandler(AddToCartCommand)
export class AddToCartHandler implements ICommandHandler<AddToCartCommand> {
  constructor(private readonly productsService: CartService) {}
  async execute(command: AddToCartCommand): Promise<CartResponseDto> {
    const user: string = command.user;
    const items: CartDetailDto[] = command.items;
    const cart = await this.productsService.addToCart(user, items);
    const raw = {
      status: HttpStatus.OK,
      message: Message.ADD_TO_CART,
      cart 
    }
    const response = plainToInstance(CartResponseDto, raw,{excludeExtraneousValues:true});
    return response;
  }
}