import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DisableAccountCommand } from '../impls/disable-account.command';
import { AccountResponseDto } from '../../dto/response/account-reponse.dto';
import { AccountService } from '../../services/account.service';
import { Message } from '../../enums/message.enum';
@CommandHandler(DisableAccountCommand)
export class DisableAccountHandler implements ICommandHandler<DisableAccountCommand> {
  constructor(private readonly accountService: AccountService) {}
  async execute(command: DisableAccountCommand): Promise<AccountResponseDto> {
    const id: string = command.id;
    const account = await this.accountService.disableAccount(id)
    const raw = {
      status: HttpStatus.OK,
      message: Message.DISABLE_SUCCESSFULLY,
      account
    }
    const response = plainToInstance(AccountResponseDto, raw,{excludeExtraneousValues: true});
    return response;
  }
}