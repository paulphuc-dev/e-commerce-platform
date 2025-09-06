import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../commands/impls/change-password.command';
import { DisableAccountCommand } from '../commands/impls/disable-account.command';
import { GetAccountsQuery } from '../queries/impls/get-accounts.query';
@Controller()
export class AccountController {
    constructor(
    private readonly commandBus: CommandBus, 
    private readonly queryBus: QueryBus
  ){}
  @GrpcMethod('ProfileService', 'GetAccounts')
  async getAccounts(data:{page: number, username?: string, role?: string}) {
    return this.queryBus.execute(new GetAccountsQuery(data.page, data.username, data.role))
  }

  @GrpcMethod('ProfileService', 'ChangePassword')
  async changePassword(data: {id: string, newPassword: string}) {
    return this.commandBus.execute(new ChangePasswordCommand(data.id, data.newPassword));
  }

  @GrpcMethod('ProfileService', 'DisableAccount')
  async disableAccount(data:{ id: string}) {
    return this.commandBus.execute(new DisableAccountCommand(data.id));
  }
}
