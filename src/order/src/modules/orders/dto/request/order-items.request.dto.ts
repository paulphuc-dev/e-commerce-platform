import { IsString, IsNumber, Min } from 'class-validator';

export class OrderItemRequestDto {

  @IsString()
  productId: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNumber()
  unitPrice: number;
}