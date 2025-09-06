import { PaymentResponseDto } from "./payment-response.dto";
export class ResponseDataDto {
    status: number;
    message: string;
    data: PaymentResponseDto[];
}