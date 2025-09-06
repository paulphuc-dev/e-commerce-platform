import { UrlPaymentResponseDto } from "./url-payment-response.dto";
export class DetailResponseDataDto {
    status: number;
    message: string;
    data: UrlPaymentResponseDto;
}