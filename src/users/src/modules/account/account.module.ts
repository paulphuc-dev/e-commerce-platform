import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountSchema } from './schema/account.schema';
import { ChangePasswordHandler } from './commands/handlers/change-password.handler';
import { DisableAccountHandler } from './commands/handlers/disable-account.handler';
import { GetAccountsHandler } from './queries/handlers/get-accounts.handler';
const CommandHandlers = [
  ChangePasswordHandler,
  DisableAccountHandler
];

const QueryHandlers = [
  GetAccountsHandler
];
@Module({
  imports:[
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'Account', schema: AccountSchema },
    ]),
  ],
  controllers: [AccountController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    AccountService
  ],
  exports: [AccountService]
})
export class AccountModule {}
