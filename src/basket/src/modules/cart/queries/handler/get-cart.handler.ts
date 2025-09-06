import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCartQuery } from '../impls/get-cart-by-user.query';
import { CartService } from '../../services/cart.service';
import { CartResponseDto } from '../../dto/response/cart-response.dto';
import { Message } from '../../enums/notification';
@QueryHandler(GetCartQuery)
export class GetCartHandler implements IQueryHandler<GetCartQuery> {
  constructor(private readonly cartService: CartService) {}

  async execute(query: GetCartQuery): Promise<CartResponseDto> {
    const { username } = query;
    const cart = await this.cartService.getCart(username);
    const raw = {
        status: HttpStatus.OK,
        message: Message.GET_ALL,
        cart
      }
    const response = plainToInstance(CartResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response; 
  }
}