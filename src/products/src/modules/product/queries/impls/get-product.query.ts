export class GetProductsQuery {
  constructor(
    public readonly page: number,
    public readonly id?: string,
    public readonly name?: string,
  ) {}
}