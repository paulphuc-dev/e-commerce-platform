import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/decorators/role.decorator';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('customer')
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