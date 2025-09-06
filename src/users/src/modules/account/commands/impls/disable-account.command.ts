import { AccountRequest } from "../../dto/request/account.request";
export class DisableAccountCommand{
    constructor(
        public readonly id: string
    ){}
}