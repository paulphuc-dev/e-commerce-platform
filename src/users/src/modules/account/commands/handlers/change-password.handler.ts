import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../impls/change-password.command';
import { AccountResponseDto } from '../../dto/response/account-reponse.dto';
import { AccountService } from '../../services/account.service';
import { Message } from '../../enums/message.enum';
@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler implements ICommandHandler<ChangePasswordCommand> {
  constructor(private readonly accountService: AccountService) {}
  async execute(command: ChangePasswordCommand): Promise<AccountResponseDto> {
    const id: string = command.id;
    const newPassword: string = command.newPassword;
    const account = await this.accountService.changePassword(id, newPassword)
    const raw = {
      status: HttpStatus.OK,
      message: Message.CHANGE_PASSWORD_SUCCESSFULLY,
      account
    }
    const response = plainToInstance(AccountResponseDto, raw,{excludeExtraneousValues: true});
    return response;
  }
}