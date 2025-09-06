import { Expose } from "class-transformer";

export class UrlPaymentResponseDto{
    @Expose()
    payUrl: string;

    @Expose()
    qrCodeUrl: string;
}