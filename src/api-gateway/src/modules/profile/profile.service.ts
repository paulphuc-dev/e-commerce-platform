import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProfileServiceGrpc } from './profile-service-grpc';
@Injectable()
export class ProfileService implements OnModuleInit{
  private profileService: ProfileServiceGrpc;
  constructor(
    @Inject('PROFILE_SERVICE') private readonly userClient: ClientGrpc
  ) {}

  onModuleInit() {
    this.profileService = this.userClient.getService<ProfileServiceGrpc>('ProfileService');
  }

  getAccounts(page: number = 1, username?: string, role?: string) {
    if(!username){
      return this.profileService.getAccounts({page});  
    }
    const data: any = {};
    data.page = page;
    if (username) data.username = username;
    if (role) data.role = role;
    return this.profileService.getAccounts(data);
  }

  changePassword(id: string, newPassword: string) {
    return this.profileService.changePassword(id, newPassword);
  }

  disableAccount(id: string) {
    return this.profileService.disableAccount(id)
  }

  getCustomers(page: number = 1, fullname?: string, phone?: string) {
    if(!fullname && !phone){
      return this.profileService.getCustomers({page});  
    }
    const data: any = {};
    data.page = page;
    if (fullname) data.fullname = fullname;
    if (phone) data.phone = phone;
    return this.profileService.getCustomers(data);
  }

  getCustomerbyId(id: string) {
    return this.profileService.getCustomerbyId(id);
  }

  createCustomer(data: any) {
    return this.profileService.createCustomer(data);
  }

  updateCustomer(id: string, data: any) {
    return this.profileService.updateCustomer(id,data);
  }

  login(loginData: any){
    return this.profileService.login(loginData);
  }
}