import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get(':username')
  getOrders(@Param('username') username: string) {
    return this.orderService.getOrders(username);
  }

  @Get(':username/:id')
  getOrderById(@Param('username') username: string, @Param('id') id: string) {
    return this.orderService.getOrderById(username, id);
  }

  @Post('checkout/:username')
  Checkout(@Param('username') username: string, @Body('method') method: string){
    return this.orderService.Checkout(username, method);
  }

  @Patch(':id')
  updateStatusOrder(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateStatusOrder(id, status)
  }
}
