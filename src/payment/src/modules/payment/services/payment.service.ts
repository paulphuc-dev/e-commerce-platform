import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Payment } from '../entities/payment.entity';
import { Status } from '../enums/status';
import { MomoPayment } from 'src/func/momo-payment';
import { PaymentRequestDto } from '../dto/request/payment-request.dto';
import { PaymentResponseDto } from '../dto/response/payment-response.dto';
import { UrlPaymentResponseDto } from '../dto/response/url-payment-response.dto';
@Injectable()
export class PaymentService {
    private momoPayment: MomoPayment;
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepo: Repository<Payment>,
        private readonly httpService: HttpService
    ) {}
    async getPayments(username: string): Promise<PaymentResponseDto[]> {
        const payments = await this.paymentRepo.find({ where: { username } });
        const response = plainToInstance(PaymentResponseDto, payments, {
            excludeExtraneousValues: true
        });
        return response;
    }

    async getPaymentById(username: string, id: string): Promise<PaymentResponseDto> {
        const payment = await this.paymentRepo.findOne({ where: { id, username } });
        const response = plainToInstance(PaymentResponseDto, payment, {
            excludeExtraneousValues: true
        });
        return response;
    }    

    async createCashPayment(paymentData: PaymentRequestDto): Promise<UrlPaymentResponseDto>{
        const orderId = paymentData.id;
        const amount = paymentData.totalAmount;
        const method = paymentData.paymentMethod;
        const username = paymentData.username;
        const payment = this.paymentRepo.create({
            orderId,
            amount,
            method,
            status: Status.success,
            username,
            paidAt: new Date()
        });
        await this.paymentRepo.save(payment);
        const data = {
            payUrl: "Kiểm tra xác nhận thanh toán qua email",   
            qrCodeUrl: "Đơn hàng đang được giao"
        }
        const res = plainToInstance(UrlPaymentResponseDto, data, {
            excludeExtraneousValues: true
        });
        return res;
    }

    async createMomoPayment(paymentData: PaymentRequestDto): Promise<UrlPaymentResponseDto> 
    {
        let res;
        this.momoPayment = new MomoPayment(paymentData, this.httpService)
        const momoRes = await this.momoPayment.ProcessingPayment();
        const orderId = paymentData.id;
        const amount = paymentData.totalAmount;
        const method = paymentData.paymentMethod;
        const username = paymentData.username;
        console.log(momoRes.data)
        if(momoRes.data.errorCode === 0){
            const payment = this.paymentRepo.create({
                orderId,
                amount,
                method,
                status: Status.success,
                username,
                paidAt: new Date()
            });
            await this.paymentRepo.save(payment);
            const data = {
                payUrl: momoRes.data.payUrl,   
                qrCodeUrl: momoRes.data.qrCodeUrl
            }
            res = plainToInstance(UrlPaymentResponseDto, data, {
                excludeExtraneousValues: true
            });
        }else{
            const data = {
                payUrl: "Thanh toán thất bại !",   
                qrCodeUrl: "Lỗi"
            }
            res = plainToInstance(UrlPaymentResponseDto, data, {
                excludeExtraneousValues: true
            });
        }
        //console.log(res);
        return res;
    }
}
