export class GetCustomersQuery{
    constructor(
        public readonly page: number,
        public readonly fullname?: string,
        public readonly phone?: string
    ){}
}