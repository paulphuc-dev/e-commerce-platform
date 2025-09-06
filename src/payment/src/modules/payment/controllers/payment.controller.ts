import { Controller, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { GetPaymentsQuery } from '../queries/impls/get-payments.query';
import { GetPaymentByIdQuery } from '../queries/impls/get-payment-by-id.query';
import { CreatePaymentCommand } from '../commands/impls/create-payment.command';
@Controller()
export class PaymentController {
  constructor(
    private readonly commandBus: CommandBus, 
    private readonly queryBus: QueryBus
  ) {}
  @GrpcMethod('PaymentService', 'GetPayments')
  async getPayments(data: { username: string }) {
    return this.queryBus.execute(new GetPaymentsQuery(data.username));
  }
  
  @GrpcMethod('PaymentService', 'GetPaymentById')
  async getPaymentById(data: { username: string, id: string }){
    return this.queryBus.execute(new GetPaymentByIdQuery(data.username, data.id));
  }
  
  @MessagePattern('order_created')
  async handleOrderCreated(@Payload() payment: any) {
    return this.commandBus.execute(new CreatePaymentCommand(payment));
  }
}
