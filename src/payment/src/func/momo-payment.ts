import * as crypto from 'crypto';
import { HttpService } from '@nestjs/axios';
import { PaymentError } from "src/modules/payment/enums/payment-error";
import { PaymentRequestDto } from "src/modules/payment/dto/request/payment-request.dto";
export class MomoPayment{
    private partnerCode?: string;
    private accessKey?: string;
    private secretKey?: string;
    private requestId: string;
    private orderId: string;
    private orderInfo: string;
    private redirectUrl?: string;
    private ipnUrl?: string;
    private requestType: string 
    private amount: number;
    private method: string;
    private username: string;
    private rawSignature: string;
    private httpService: HttpService;
    constructor(
       paymentData: PaymentRequestDto,
       httpService: HttpService
    ){
        this.httpService = httpService;
        this.partnerCode = process.env.MOMO_PARTNER_CODE;
        this.accessKey = process.env.MOMO_ACCESS_KEY;
        this.secretKey = process.env.MOMO_SECRET_KEY;
        this.requestId = `${this.partnerCode}${Date.now()}`;
        this.orderId = paymentData.id;
        this.orderInfo = `Thanh toán đơn hàng ${paymentData.id}`;
        this.redirectUrl = process.env.MOMO_RETURN_URL;
        this.ipnUrl = process.env.MOMO_IPN_URL;
        this.requestType = 'captureMoMoWallet';
        this.amount = paymentData.totalAmount;
        this.method = paymentData.paymentMethod;
        this.username = paymentData.username;
        this.rawSignature = `accessKey=${this.accessKey}&amount=${this.amount}&ipnUrl=${this.ipnUrl}&orderId=${this.orderId}&orderInfo=${this.orderInfo}&partnerCode=${this.partnerCode}&redirectUrl=${this.redirectUrl}&requestId=${this.requestId}&requestType=${this.requestType}`;
    }
    async ProcessingPayment(){
        const partnerCode = this.partnerCode;
        const accessKey = this.accessKey;
        const requestId = this.requestId;
        const orderId = this.orderId;
        const orderInfo = this.orderInfo;
        const amount = this.amount;
        const redirectUrl = this.redirectUrl;
        const ipnUrl = this.ipnUrl;
        const requestType = this.requestType;
        if (!this.secretKey) {
            throw new Error(PaymentError.SECRET_KEY_NOT_FOUND);
        }
        const rawSignature =
            "partnerCode=" + partnerCode +
            "&accessKey=" + accessKey +
            "&requestId=" + requestId +
            "&amount=" + amount +
            "&orderId=" + orderId +
            "&orderInfo=" + orderInfo +
            "&returnUrl=" + redirectUrl +
            "&notifyUrl=" + ipnUrl +
            "&extraData=";

        const signature = crypto
            .createHmac("sha256", this.secretKey)
            .update(rawSignature)
            .digest("hex");

        const payload = {
            partnerCode,
            accessKey,
            requestId,
            amount: amount.toString(),
            orderId,
            orderInfo,
            returnUrl: redirectUrl,
            notifyUrl: ipnUrl,
            extraData: "",
            requestType,
            signature,
        };
        // Gọi API MoMo sandbox
        const endpoint = process.env.MOMO_ENDPOINT;
        if (!endpoint) {
            throw new Error(PaymentError.MOMO_ENDPOINT_NOT_FOUND);
        }
        const momoRes = await this.httpService.axiosRef.post(
            endpoint,
            payload,
            { headers: { "Content-Type": "application/json" } }
        );
        return momoRes;
    }
}