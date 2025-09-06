import { Expose, Type } from "class-transformer";
import { OrderDto } from "./order.dto";
import { ResponseDto } from "src/common/base/dto/response.dto";
export class DetailOrderResponseDto extends ResponseDto{
    @Expose()
    @Type(() => OrderDto)
    order: OrderDto;
}