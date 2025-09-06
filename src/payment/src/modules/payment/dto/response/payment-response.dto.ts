import { Expose } from "class-transformer";
import { BaseDto } from "src/common/base/dto/base.dto";
import { Status } from "../../enums/status";
export class PaymentResponseDto extends BaseDto{
  @Expose()
  id: string;

  @Expose()
  orderId: string;

  @Expose()
  amount: number;

  @Expose()
  method: string;

  @Expose()
  status: Status;
}