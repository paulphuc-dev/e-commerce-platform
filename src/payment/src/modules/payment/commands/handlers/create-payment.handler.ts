import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePaymentCommand } from '../impls/create-payment.command';
import { PaymentRequestDto } from '../../dto/request/payment-request.dto';
import { DetailResponseDataDto } from '../../dto/response/detail-response-data.dto';
import { PaymentService } from '../../services/payment.service';
import { Message } from '../../enums/message';
import { Methods } from '../../enums/methods';
@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand> {
  constructor(private readonly paymentService: PaymentService) {}
  async execute(command: CreatePaymentCommand) {
    let response;
    const data: PaymentRequestDto = command.data;
    switch(data.paymentMethod)
    {
      case Methods.MOMO:
      {
        const transaction = await this.paymentService.createMomoPayment(data);
        const raw = {
          status: HttpStatus.OK,
          message: Message.CREATE_SUCCESSFULLY,
          transaction
        }
        response = raw;
        break;
      }
      case Methods.CASH:
      {
        const transaction = await this.paymentService.createCashPayment(data);
        const raw = {
          status: HttpStatus.OK,
          message: Message.CREATE_SUCCESSFULLY,
          transaction
        }
        response =  raw
        break;
      }
    }
    return response;
  }
}