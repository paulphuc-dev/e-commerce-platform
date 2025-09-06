import { Expose } from "class-transformer";
export class BaseDto{
  @Expose()
  username: string;
  
  @Expose()
  paidAt: Date;
}