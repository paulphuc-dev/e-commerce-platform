import { Expose } from "class-transformer";
export class AccountDto{
    @Expose()
    username: string;

    @Expose()
    password: string;

    @Expose()
    role: string;

    @Expose()
    customer_id: string;
}