import { Expose } from "class-transformer";
import { ResponseDto } from "src/common/base/dto/response.dto";
export class CheckoutResponse extends ResponseDto{
    @Expose()
    notification: string;
}