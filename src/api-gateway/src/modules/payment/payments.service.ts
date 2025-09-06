import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { PaymentServiceGrpc } from './payment-service-grpc';
@Injectable()
export class PaymentsService implements OnModuleInit {
  private paymentService: PaymentServiceGrpc;
  constructor(
    @Inject('PAYMENT_SERVICE') private readonly client: ClientGrpc
  ) {}

  onModuleInit() {
    this.paymentService = this.client.getService<PaymentServiceGrpc>('PaymentService');
  }

  getPayments(username: string) {
    return this.paymentService.getPayments({username});
  }

  getPaymentbyId(username: string, id: string) {
    return this.paymentService.getPaymentbyId({username, id});
  }
}