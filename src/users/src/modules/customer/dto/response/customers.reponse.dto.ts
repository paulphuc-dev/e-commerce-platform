import { Expose, Type } from "class-transformer";
import { PaginationResponseDto } from "./pagination-response.dto";
import { ResponseDto } from "src/common/base/dto/response.dto";
export class CustomersResponseDto extends ResponseDto{
    @Expose()
    @Type(()=> PaginationResponseDto)
    pagination: PaginationResponseDto;
}