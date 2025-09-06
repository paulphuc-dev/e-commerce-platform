import { IsNumber, IsString } from "class-validator";
export class ProductRequestDto{
    @IsString()
    name: string;
    
    @IsString()
    description: string;
      
    @IsNumber()
    stock: number;
      
    @IsNumber()
    price: number;

    @IsString()
    username: string;

    image?: Buffer;

    filename?: string

    mimetype?: string;
}