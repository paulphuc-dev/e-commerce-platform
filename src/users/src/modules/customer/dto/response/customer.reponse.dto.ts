import { Expose, Type } from "class-transformer";
import { ResponseDto } from "src/common/base/dto/response.dto";
import { CustomerDataResponseDto } from "./customer-data.response.dto";
export class CustomerResponseDto extends ResponseDto{
    @Expose()
    @Type(()=> CustomerDataResponseDto)
    customer: CustomerDataResponseDto;
}