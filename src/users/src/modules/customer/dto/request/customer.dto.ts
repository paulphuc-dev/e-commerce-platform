import { IsString, IsNumber } from "class-validator";
export class CustomerDto {
    @IsString()
    fullName: string;
    
    @IsNumber()
    age: number;

    @IsString()  
    phone: string;

    @IsString()
    address: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}