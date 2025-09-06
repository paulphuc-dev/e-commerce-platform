import { IsNumber, IsString } from 'class-validator';

export class PaymentRequestDto {
  @IsString()
  id: string;
  
  @IsString()
  paymentMethod: string;

  @IsNumber()
  totalAmount: number;

  @IsString()
  status: string;

  @IsString()
  username: string;
}