import { OrderRequestDto } from "../../dto/request/order.request.dto";
export class CreateOrderCommand {
  constructor(public readonly data: OrderRequestDto) {}
}