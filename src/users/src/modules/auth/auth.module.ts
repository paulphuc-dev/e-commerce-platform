import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AccountModule } from '../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { LoginHandler } from './commands/handlers/login.handler';
@Module({
  imports:[ 
    CqrsModule, 
    AccountModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES') || '3600s' },
      }),
    }),
   ],
  controllers: [AuthController],
  providers: [
    LoginHandler, 
    AuthService, 
    JwtStrategy
  ]
})
export class AuthModule {}
