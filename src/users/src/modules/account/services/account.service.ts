import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Account } from '../schema/account.schema';
import { AccountRequest } from '../dto/request/account.request';
import { AccountDto } from '../dto/response/account.dto';
import { Pagination } from '../dto/response/pagination.dto';
import { AccountRequestDto } from '../dto/request/account-request.dto';
import { AccountResponseDto } from '../dto/response/account-reponse.dto';
@Injectable()
export class AccountService {
    constructor(@InjectModel(Account.name) private userModel: Model<Account>) {}

    async findByUsername(username: string){
        return this.userModel.findOne({ username }).exec();
    }

    async createMany(accounts: AccountRequest[])
    {
        const data: AccountRequest[] = [];
        for(const account of accounts){
            const existing = await this.userModel.findOne({ username: account.username });
            if(existing){
                continue;
            }else{
                await this.userModel.create(account);
                data.push(account);
            }
        }
        return data;
    }

    async create(data: AccountRequestDto): Promise<AccountResponseDto> {
        const newAccount = await this.userModel.create(data);
        const res =  plainToInstance(AccountResponseDto, newAccount, {
            excludeExtraneousValues: true,
        });
        return res;
    }

    async getCustomers(page: number = 1, username?: string, role?: string): Promise<Pagination> 
    {
        const limit = 10; 
        const filter: any = {};
    
        if (username) {
            filter.username = { $regex: username, $options: 'i' };
        }
    
        if (role) {
            filter.role = { $regex: role, $options: 'i' };
        }
    
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.userModel.find(filter).skip(skip).limit(limit).exec(),
            this.userModel.countDocuments(filter),
        ]);
        const accounts = plainToInstance(AccountDto, data, { excludeExtraneousValues: true });
        const pagination = {
            total,
            page,
            totalPages: Math.ceil(total / limit),
            accounts
        }
        const res = plainToInstance(Pagination, pagination, { excludeExtraneousValues: true });
        return res;
    }

    async changePassword(id: string, newPassword: string) : Promise<AccountResponseDto>{
        const hash = await bcrypt.hash(newPassword, 10); // hash password trước khi lưu
        const data = this.userModel.findByIdAndUpdate(
            id,
            { password: hash },
            { new: true } 
        );
        const res = plainToInstance(AccountResponseDto, data, {excludeExtraneousValues: true});
        return res;
    }

    async disableAccount(id: string) {
        const data = this.userModel.findByIdAndUpdate(
            id,
            { $set: { isActive: false } }, 
            { new: true }                  
        );
        const res = plainToInstance(AccountResponseDto, data, {excludeExtraneousValues: true});
        return res;
    }
}
