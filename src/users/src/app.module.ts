import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { CustomerModule } from './modules/customer/customer.module';
import { DatabaseModule } from './database/database.module';
import { CronjobModule } from './seeds/cronjob.module';
@Module({
  imports: [ 
    AccountModule, 
    AuthModule, 
    CustomerModule, 
    DatabaseModule,
    CronjobModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(){
    console.log('✅ Profile Module loaded !');
  }
}
