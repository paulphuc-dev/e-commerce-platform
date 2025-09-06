import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../impls/create-customer.command';
import { CustomerDto } from '../../dto/request/customer.dto';
import { CustomerResponseDto } from '../../dto/response/customer.reponse.dto';
import { CustomerService } from '../../services/customer.service';
import { Message } from '../../enums/message';
@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
  constructor(private readonly customerService: CustomerService) {}
  async execute(command: CreateCustomerCommand): Promise<CustomerResponseDto> {
    const data: CustomerDto = command.data;
    const customer = await this.customerService.createCustomer(data);
    const raw = {
      status: HttpStatus.OK,
      message: Message.CREATE_SUCCESSFULLY,
      customer 
    }
    const response = plainToInstance(CustomerResponseDto, raw,{excludeExtraneousValues:true});
    return response;
  }
}