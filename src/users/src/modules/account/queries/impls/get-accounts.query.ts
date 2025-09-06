export class GetAccountsQuery{
    constructor(
        public readonly page: number,
        public readonly username?: string,
        public readonly role?: string
    ){}
}