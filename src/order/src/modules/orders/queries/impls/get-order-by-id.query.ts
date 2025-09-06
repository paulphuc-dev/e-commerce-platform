export class GetOrderByIdQuery {
  constructor(
    public readonly username: string,
    public readonly id: string
  ) {}
}