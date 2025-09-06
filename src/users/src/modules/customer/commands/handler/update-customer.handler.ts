import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCustomerCommand } from '../impls/update-customer.command';
import { CustomerResponseDto } from '../../dto/response/customer.reponse.dto';
import { CustomerService } from '../../services/customer.service';
import { CustomerDto } from '../../dto/request/customer.dto';
import { Message } from '../../enums/message';
@CommandHandler(UpdateCustomerCommand)
export class UpdateCustomerHandler implements ICommandHandler<UpdateCustomerCommand> {
  constructor(private readonly customerService: CustomerService) {}
  async execute(command: UpdateCustomerCommand): Promise<CustomerResponseDto> {
    const id: string = command.id;
    const update: CustomerDto = command.update;
    const customer = await this.customerService.updateCustomer(id, update)
    const raw = {
      status: HttpStatus.OK,
      message: Message.UPDATE_SUCCESSFULLY,
      customer
    }
    const response = plainToInstance(CustomerResponseDto, raw,{excludeExtraneousValues: true});
    return response;
  }
}