import { Expose, Type } from "class-transformer";
import { CartDto } from "./cart.dto";
import { ResponseDto } from "src/common/base/dto/response.dto";
export class CartResponseDto extends ResponseDto{
    @Expose()
    @Type(() => CartDto)
    cart: CartDto;
}