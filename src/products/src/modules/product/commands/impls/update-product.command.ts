import { UpdateProductRequestDto } from "../../dto/request/update-product.request.dto";
export class UpdateProductCommand {
  constructor(
    public readonly id: string,
    public readonly update: UpdateProductRequestDto
  ) {}
}