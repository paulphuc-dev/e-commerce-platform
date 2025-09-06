import { CustomerDto } from "../../dto/request/customer.dto";
export class CreateCustomerCommand {
  constructor(public readonly data: CustomerDto ) {}
}