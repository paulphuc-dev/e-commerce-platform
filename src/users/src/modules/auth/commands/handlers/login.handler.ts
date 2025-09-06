import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from '../impls/login.command';
import { SigninReq } from '../../dto/signin.req';
import { SigninRes } from '../../dto/signin.res';
import { AuthService } from '../../services/auth.service';
import { Message } from '../../enums/message.enum';
@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private readonly authService: AuthService) {}
  async execute(command: LoginCommand): Promise<SigninRes> {
    const data: SigninReq = command.data;
    const token = await this.authService.login(data);
    const raw = {
      status: HttpStatus.OK,
      message: Message.SIGNIN_SUCCESSFULLY,
      token 
    }
    const response = plainToInstance(SigninRes, raw,{excludeExtraneousValues:true});
    return response;
  }
}