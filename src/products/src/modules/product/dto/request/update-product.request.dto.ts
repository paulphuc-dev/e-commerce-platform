import { IsBoolean, IsNumber, IsString } from "class-validator";
export class UpdateProductRequestDto{
    @IsString()
    name: string;
    
    @IsString()
    description: string;
      
    @IsNumber()
    stock: number;
      
    @IsNumber()
    price: number;
    
    @IsBoolean()
    isActive: boolean;

    @IsString()
    avatarUrl: string;

    @IsString()
    username: string;
}