import { Expose, Type} from "class-transformer"
import { ResponseDto } from "../../../../common/base/dto/reponse.dto"
import { PaginationResponseDto } from "./pagination.response.dto"
export class ProductsResponseDto extends ResponseDto{
    @Expose()
    @Type(() => PaginationResponseDto)
    pagination: PaginationResponseDto;
}