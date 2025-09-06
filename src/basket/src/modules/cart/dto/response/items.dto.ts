import { Expose } from "class-transformer";
export class Item{

  @Expose()
  cartId: string;

  @Expose()
  productId: string;

  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  subTotal: number;
}