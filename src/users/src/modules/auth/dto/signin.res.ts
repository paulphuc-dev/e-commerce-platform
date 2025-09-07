import { Expose } from "class-transformer";
import { ResponseData } from "./response-data";
export class SigninRes{ 
    @Expose()
    status: number;

    @Expose()
    message: string;

    @Expose()
    data: ResponseData;
}