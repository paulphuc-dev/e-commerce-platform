import { CustomerDto } from "../../dto/request/customer.dto";
export class UpdateCustomerCommand {
  constructor(
    public readonly id: string,
    public readonly update: CustomerDto ) {}
}