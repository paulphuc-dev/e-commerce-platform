import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAccountsQuery } from '../impls/get-accounts.query';
import { AccountService } from '../../services/account.service';
import { AccountsResponseDto } from '../../dto/response/accounts-response.dto';
import { Message } from '../../enums/message.enum';
@QueryHandler(GetAccountsQuery)
export class GetAccountsHandler implements IQueryHandler<GetAccountsQuery> {

  constructor(private readonly productService: AccountService) {}
  async execute(query: GetAccountsQuery): Promise<AccountsResponseDto> {
    const { page, username, role } = query;
    const pagination = await this.productService.getCustomers( page, username, role);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_ALL_SUCCESSFULLY,
      pagination
    };
    const response = plainToInstance(AccountsResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response
  }
}