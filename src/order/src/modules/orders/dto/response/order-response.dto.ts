import { Expose, Type } from "class-transformer";
import { OrderDto } from "./order.dto";
import { ResponseDto } from "src/common/base/dto/response.dto";
export class OrderResponseDto extends ResponseDto{
    @Expose()
    @Type(() => OrderDto)
    orders: OrderDto[];
}