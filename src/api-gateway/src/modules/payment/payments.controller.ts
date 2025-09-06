import { Controller, Get, Param } from '@nestjs/common';
import { PaymentsService } from './payments.service';

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