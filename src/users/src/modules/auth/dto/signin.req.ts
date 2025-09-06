import { IsString } from "class-validator";
export class SigninReq{
    @IsString()
    username: string;

    @IsString()
    password: string;
}