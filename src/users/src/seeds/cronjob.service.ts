import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CustomerService } from 'src/modules/customer/services/customer.service';
import { AccountService } from 'src/modules/account/services/account.service';

@Injectable()
export class CronjobService implements OnModuleInit{
  private readonly logger = new Logger(CronjobService.name);

  constructor(
    private readonly customerService: CustomerService,
    private readonly accountService: AccountService
  ){}

  async onModuleInit() {
    await this.runAccountTask()
    this.logger.log('All tasks completed.');
  }

  private async runCustomerTask(){
    const customerData = [
        {
            fullName: "Phúc Nguyễn",
            age: 23,
            phone: "094874363",
            address: "12/3 Tôn Đức Thắng"
        },
        {
            fullName: "Anh Nguyễn",
            age: 23,
            phone: "084855378",
            address: "12/3 Đinh Đức Thiện"
        },
      ]
      const res = await this.customerService.createMany(customerData);
      const ids = res.map((doc: any) => doc._id.toString());
      return ids;
  }

  private async runAccountTask(){
    const ids = await this.runCustomerTask();
    const accountData = [
      {
        username: "Paul",
        password: "12345",
        role: "customer",
        customer_id: ids[0]
      },
      {
        username: "Step",
        password: "12345",
        role: "customer",
        customer_id: ids[1]
      }
    ] 
    await this.accountService.createMany(accountData);
  }
}