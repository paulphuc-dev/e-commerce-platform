import { Expose, Type } from "class-transformer";
import { AccountDto } from "./account.dto";
import { ResponseDto } from "src/common/base/dto/response.dto";
export class AccountResponseDto extends ResponseDto {
    @Expose()
    @Type(()=> AccountDto)
    account: AccountDto;
}