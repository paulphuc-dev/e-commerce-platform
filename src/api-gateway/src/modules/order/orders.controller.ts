import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Roles('customer')
  @Get(':username')
  getOrders(@Param('username') username: string) {
    return this.orderService.getOrders(username);
  }

  @Roles('customer')
  @Get(':username/:id')
  getOrderById(@Param('username') username: string, @Param('id') id: string) {
    return this.orderService.getOrderById(username, id);
  }

  @Roles('customer')
  @Post('checkout/:username')
  Checkout(@Param('username') username: string, @Body('method') method: string){
    return this.orderService.Checkout(username, method);
  }

  @Roles('admin', 'shipper')
  @Patch(':id')
  updateStatusOrder(@Param('id') id: string, @Body('status') status: string) {
    return this.orderService.updateStatusOrder(id, status)
  }
}
