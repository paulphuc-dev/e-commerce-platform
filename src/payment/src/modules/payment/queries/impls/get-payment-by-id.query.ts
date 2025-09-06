export class GetPaymentByIdQuery{
    constructor(
        public readonly username: string,
        public readonly id: string
    ) {}
}