export class CheckoutCommand {
  constructor(
    public readonly username: string,
    public readonly method: string
  ) {}
}