import { Expose } from "class-transformer";
export class ResponseData{
    @Expose()
    token: string;

    @Expose()
    username: string;
}