import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested, IsArray } from 'class-validator';
import { OrderItemRequestDto } from './order-items.request.dto';

export class OrderRequestDto {
  @IsNumber()
  total: number;

  @IsString()
  username: string;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemRequestDto)
  items: OrderItemRequestDto[];
}