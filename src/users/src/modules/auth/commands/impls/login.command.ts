import { SigninReq } from "../../dto/signin.req";
export class LoginCommand {
  constructor(public readonly data: SigninReq) {}
}