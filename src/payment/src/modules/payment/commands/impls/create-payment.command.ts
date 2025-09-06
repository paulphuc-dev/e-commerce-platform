import { PaymentRequestDto } from "../../dto/request/payment-request.dto";
export class CreatePaymentCommand {
    constructor(
        public readonly data: PaymentRequestDto,
    ){}
}