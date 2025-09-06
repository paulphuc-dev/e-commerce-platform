import { ProductRequestDto } from "../../dto/request/create-product.request.dto";
export class CreateProductCommand {
  constructor(public readonly data: ProductRequestDto) {}
}