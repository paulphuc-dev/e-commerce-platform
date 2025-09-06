import { Controller, Get, Post, Put, Delete ,Param, Query, Body } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Get(':username')
    getCart(@Param('username') username: string){
        return this.cartService.getCart(username);
    }

    @Post(':username')
    addToCart(
        @Param('username') username: string, 
        @Body('items') items: any[]
    ){
        return this.cartService.addToCart(username, items);
    }

    @Post('/order/:username')
    Order(@Param('username') username: string){
        return this.cartService.Order(username);
    }
}