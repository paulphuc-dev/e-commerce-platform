import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomerbyIdQuery } from '../impls/get-customer-by-id.query';
import { CustomerService } from '../../services/customer.service';
import { CustomerResponseDto } from '../../dto/response/customer.reponse.dto';
import { Message } from '../../enums/message';
@QueryHandler(GetCustomerbyIdQuery)
export class GetCustomerByIdHandler implements IQueryHandler<GetCustomerbyIdQuery> {
  constructor(private readonly customerService: CustomerService) {}

  async execute(query: GetCustomerbyIdQuery): Promise<CustomerResponseDto> {
    const { id } = query;
    const customer = await this.customerService.getCustomerById(id);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_BY_ID_SUCCESSFULLY,
      customer
    }
    const response = plainToInstance(CustomerResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response; 
  }
}