import { IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CartDetailDto {
  @IsString()
  productId: string;
  
  @IsNumber()
  @Type(() => Number)
  quantity: number;
  
  @IsNumber()
  @Type(() => Number)
  unitPrice: number;
}