import { Controller} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCustomerCommand } from '../commands/impls/create-customer.command';
import { UpdateCustomerCommand } from '../commands/impls/update-customer.command';
import { GetCustomersQuery } from '../queries/impls/get-customer.query';
import { GetCustomerbyIdQuery } from '../queries/impls/get-customer-by-id.query';
@Controller()
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus, 
    private readonly queryBus: QueryBus
  ){}

  @GrpcMethod('ProfileService', 'GetCustomers')
  async getCustomers(data:{page: number, fullname?: string, phone?: string}) {
    return this.queryBus.execute(new GetCustomersQuery(data.page, data.fullname, data.phone))
  }

  @GrpcMethod('ProfileService', 'GetCustomerById')
  async getCustomerById(data:{id: string}) {
    return this.queryBus.execute(new GetCustomerbyIdQuery(data.id))
  }

  @GrpcMethod('ProfileService', 'CreateCustomer')
  async createCutomer(data: any) {
    return this.commandBus.execute(new CreateCustomerCommand(data));
  }

  @GrpcMethod('ProfileService', 'UpdateCustomer')
  async updateProduct(data: {id: string, update: any}) {
    return this.commandBus.execute(new UpdateCustomerCommand(data.id, data.update));
  }
}