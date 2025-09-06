import { Module } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CustomerModule } from 'src/modules/customer/customer.module';
import { AccountModule } from 'src/modules/account/account.module';
@Module({
  imports: [ 
    CustomerModule,
    AccountModule
  ],
  providers: [CronjobService]
})
export class CronjobModule {}