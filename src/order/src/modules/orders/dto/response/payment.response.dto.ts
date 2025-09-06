import { Expose, Type } from 'class-transformer';
export class PaymentResponseDto {
  @Expose()
  id: string;
  
  @Expose()
  paymentMethod: string;

  @Expose()
  totalAmount: number;
  
  @Expose()
  status: string;
  
  @Expose()
  username: string;
}