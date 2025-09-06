import { CartDetailDto } from "../../dto/request/cart-detail.dto";
export class AddToCartCommand {
  constructor(
    public readonly user: string,
    public readonly items: CartDetailDto[]
  ) {}
}