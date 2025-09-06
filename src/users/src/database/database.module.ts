import { MongooseModule } from '@nestjs/mongoose';
import { Module, Global } from '@nestjs/common';
import {ConfigModule, ConfigService } from '@nestjs/config';
@Global()
@Module({
  imports: [
	ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URL'),
      }),
    }),
  ],
})
export class DatabaseModule {}