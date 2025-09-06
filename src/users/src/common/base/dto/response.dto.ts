import { Expose } from "class-transformer";
export class ResponseDto{
    @Expose()
    status: number;

    @Expose()
    message: string;
}