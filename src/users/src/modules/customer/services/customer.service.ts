import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schema/customer.schema';
import { plainToInstance } from 'class-transformer';
import { CustomerReq } from '../dto/request/customer.req';
import { CustomerRes } from '../dto/response/customer.res';
import { CustomerDataResponseDto } from '../dto/response/customer-data.response.dto';
import { PaginationResponseDto } from '../dto/response/pagination-response.dto';
import { CustomerDto } from '../dto/request/customer.dto';
import { CustomerResponseDto } from '../dto/response/customer.reponse.dto';
import { AccountService } from 'src/modules/account/services/account.service';
@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        private readonly accountService: AccountService
    ) {}
    async createMany(customers: CustomerReq[])
    {
        const data: CustomerRes[] = [];
        for(const customer of customers){
            const existing = await this.customerModel.findOne({ phone: customer.phone });
            if(existing){
                continue;
            }else{
                const res = await this.customerModel.create(customer);
                data.push(res);
            }
        }
        return data;
    }

    async getCustomers(page: number = 1, fullname?: string, phone?: string): Promise<PaginationResponseDto> {
        const limit = 10; 
        const filter: any = {};

        if (fullname) {
            filter.fullName = { $regex: fullname, $options: 'i' };
        }

        if (phone) {
            filter.phone = { $regex: phone, $options: 'i' };
        }

        const skip = (page - 1) * limit;

        const [data, total] = await Promise.all([
            this.customerModel.find(filter).skip(skip).limit(limit).exec(),
            this.customerModel.countDocuments(filter),
        ]);
        const customers = plainToInstance(CustomerDataResponseDto, data, { excludeExtraneousValues: true });
        const pagination = {
            total,
            page,
            totalPages: Math.ceil(total / limit),
            customers
        }
        const res = plainToInstance(PaginationResponseDto, pagination, { excludeExtraneousValues: true });
        return res;
    }

    async getCustomerById(id: string): Promise<CustomerResponseDto> {
        const customer = await this.customerModel.findById(id).exec();
        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        const res = plainToInstance(CustomerResponseDto, customer, {excludeExtraneousValues: true});
        return res;
    }

    async createCustomer(data: CustomerDto): Promise<CustomerResponseDto>{
        const newCustomer = new this.customerModel({
            fullName: data.fullName,
            age: data.age,
            phone: data.phone,
            address: data.address,
        });
        await newCustomer.save();

        // B2: Tạo account từ 3 field cuối
        await this.accountService.create({
            username: data.username,
            password: data.password,
            role: data.role,
            customerId: newCustomer._id
        });
        const res = plainToInstance(CustomerResponseDto, newCustomer, {excludeExtraneousValues: true});
        return res;
    }

    async updateCustomer(id: string, update: CustomerDto): Promise<CustomerResponseDto> {
        const customer = await this.customerModel.findByIdAndUpdate(id, { $set: update },{ new: true });
        if (!customer) {
            throw new NotFoundException(`Customer with id ${id} not found`);
        }
        const res = plainToInstance(CustomerResponseDto, customer, {excludeExtraneousValues: true});
        return res;
    }

}