import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AccountModule } from '../account/account.module';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports:[ CqrsModule, AccountModule ],
  controllers: [AuthController],
  providers: [AuthService, JwtService]
})
export class AuthModule {}
