import { Expose } from "class-transformer";
export class SigninRes{
    @Expose()
    token: string;
}