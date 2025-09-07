import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/role.decorator';
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('customer')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

  @Get(':username')
  getPayments(@Param('username') username: string) {
    return this.paymentService.getPayments(username);
  }

  @Get(':username/:id')
  getPaymentById(@Param('username') username: string, @Param('id') id: string) {
    return this.paymentService.getPaymentbyId(username, id);
  }
}