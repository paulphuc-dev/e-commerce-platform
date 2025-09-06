import { Expose } from "class-transformer";
import { Type } from "class-transformer";
import { AccountDto } from "./account.dto";
export class Pagination{
    @Expose()
    total: number;
    
    @Expose()
    page: number;
    
    @Expose()
    totalPages: number; 

    @Expose()
    @Type(() => AccountDto)
    accounts: AccountDto;
}