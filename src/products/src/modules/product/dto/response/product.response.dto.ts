import { Expose, Type} from "class-transformer"
import { ResponseDto } from "../../../../common/base/dto/reponse.dto"
import { ProductDataResponseDto } from "./product-data.response.dto";
export class ProductResponseDto extends ResponseDto{
    @Expose()
    @Type(() => ProductDataResponseDto)
    product: ProductDataResponseDto;
}