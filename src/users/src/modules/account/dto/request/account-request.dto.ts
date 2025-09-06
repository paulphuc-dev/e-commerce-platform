import { IsString } from "class-validator";
export class AccountRequestDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  role: string;

  @IsString()
  customerId: string;
}