import { Expose, Type} from "class-transformer"
import { ProductDataResponseDto } from "./product-data.response.dto";
export class PaginationResponseDto{
    @Expose()
    total: number;
    
    @Expose()
    page: number;
    
    @Expose()
    totalPages: number; 

    @Expose()
    @Type(() => ProductDataResponseDto)
    products: ProductDataResponseDto;
}