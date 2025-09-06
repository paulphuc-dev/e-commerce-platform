import { Expose } from "class-transformer";
import { Type } from "class-transformer";
import { Pagination } from "./pagination.dto";
export class AccountsResponseDto{
    @Expose()
    status: number;

    @Expose()
    message: string;

    @Expose()
    @Type(()=> Pagination)
    pagination: Pagination
}