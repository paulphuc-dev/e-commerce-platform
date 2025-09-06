import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPaymentsQuery } from '../impls/get-payments.query';
import { PaymentService } from '../../services/payment.service';
import { ResponseDataDto } from '../../dto/response/response-data.dto';
import { Message } from '../../enums/message';
@QueryHandler(GetPaymentsQuery)
export class GetPaymentsHandler implements IQueryHandler<GetPaymentsQuery> {

  constructor(private readonly paymentService: PaymentService) {}
  async execute(query: GetPaymentsQuery): Promise<ResponseDataDto> {
    const { username } = query;
    const data = await this.paymentService.getPayments(username);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_ALL_SUCCESSFULLY,
      data
    };
    const response = plainToInstance(ResponseDataDto, raw, {
      excludeExtraneousValues: true,
    });
    return response
  }
}
