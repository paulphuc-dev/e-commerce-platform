import { Expose } from 'class-transformer';

export class OrderItemResponseDto {
  @Expose()
  id: string;

  @Expose()
  ordersId: string;

  @Expose()
  productsId: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;
}