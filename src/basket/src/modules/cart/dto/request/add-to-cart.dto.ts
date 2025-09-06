import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CartDetailDto } from './cart-detail.dto';

export class AddToCartDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartDetailDto)
  items: CartDetailDto[];
}