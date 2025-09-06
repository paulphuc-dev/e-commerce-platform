import { Type, Expose } from 'class-transformer';
import { OrderItemResponseDto } from './order-items.response.dto';
export class OrderDto {
  @Expose()
  id: string;

  @Expose()
  totalAmount: number;

  @Expose()
  status: string;

  @Expose()
  username: string;

  @Expose()
  @Type(() => OrderItemResponseDto)
  items: OrderItemResponseDto[];
}