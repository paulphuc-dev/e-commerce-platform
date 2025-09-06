import { Controller, Get, Post, Put, Param, Query, Body} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ParseIntPipe } from '@nestjs/common';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('accounts')
  getAccounts(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('username') username?: string,
    @Query('role') role?: string
  ) {
    return this.profileService.getAccounts(page, username, role);
  }

  @Put('accounts/:id')
  updateAccount(@Param() id: string, @Body('newPassword') newPassword: string) {
    return this.profileService.changePassword(id, newPassword);
  }

  @Put('accounts/disable/:id')
  disableAccount(@Param() id: string) {
    return this.profileService.disableAccount(id);
  }

  @Get('customers')
  getCustomers(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('fullname') fullname?: string,
    @Query('phone') phone?: string,
  ) {
    return this.profileService.getCustomers(page, fullname, phone);
  }

  @Get('customers/:id')
  getCustomerbyId(@Param() id: string) {
    return this.profileService.getCustomerbyId(id)
  }

  @Post('customers')
  createCustomer(@Body() data: any) {
    return this.profileService.createCustomer(data);
  }

  @Put('customers/:id')
  updateCustomer(@Param() id: string, @Body() data: any) {
    return this.profileService.updateCustomer(id, data);
  }
  
  @Post('auth/login')
  Login(@Body() loginData: any) {
    return this.profileService.login(loginData);
  }
}