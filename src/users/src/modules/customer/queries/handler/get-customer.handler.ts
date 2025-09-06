import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCustomersQuery } from '../impls/get-customer.query';
import { CustomerService } from '../../services/customer.service';
import { Message } from '../../enums/message';
import { CustomersResponseDto } from '../../dto/response/customers.reponse.dto';
@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {

  constructor(private readonly customerService: CustomerService) {}
  async execute(query: GetCustomersQuery): Promise<CustomersResponseDto> {
    const { page, fullname, phone } = query;
    const pagination = await this.customerService.getCustomers(page, fullname, phone);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_ALL_SUCCESSFULLY,
      pagination
    };
    const response = plainToInstance(CustomersResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response
  }
}