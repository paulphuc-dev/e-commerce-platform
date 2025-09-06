import { Controller} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginCommand } from '../commands/impls/login.command';
@Controller()
export class AuthController {
  constructor(private readonly commandBus: CommandBus){}
  @GrpcMethod('ProfileService', 'Login')
  async Login(data: any) {
    return this.commandBus.execute(new LoginCommand(data));
  }
}
