import { Expose, Type} from "class-transformer"
import { CustomerDataResponseDto } from "./customer-data.response.dto";
export class PaginationResponseDto{
    @Expose()
    total: number;
    
    @Expose()
    page: number;
    
    @Expose()
    totalPages: number; 

    @Expose()
    @Type(() => CustomerDataResponseDto)
    customers: CustomerDataResponseDto;
}