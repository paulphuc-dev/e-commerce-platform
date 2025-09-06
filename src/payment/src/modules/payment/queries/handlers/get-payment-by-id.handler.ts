import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentByIdQuery } from '../impls/get-payment-by-id.query';
import { PaymentService } from '../../services/payment.service';
import { DetailResponseDataDto } from '../../dto/response/detail-response-data.dto';
import { Message } from '../../enums/message';
@QueryHandler(GetPaymentByIdQuery)
export class GetPaymentByIdHandler implements IQueryHandler<GetPaymentByIdQuery> {

  constructor(private readonly paymentService: PaymentService) {}
  async execute(query: GetPaymentByIdQuery): Promise<DetailResponseDataDto> {
    const { username, id } = query;
    const data = await this.paymentService.getPaymentById(username, id);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_ALL_SUCCESSFULLY,
      data
    };
    const response = plainToInstance(DetailResponseDataDto, raw, {
      excludeExtraneousValues: true,
    });
    return response
  }
}