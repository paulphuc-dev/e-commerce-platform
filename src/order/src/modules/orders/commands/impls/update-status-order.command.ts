export class UpdateStatusOrderCommand {
  constructor(
    public readonly id: string,
    public readonly status: string
  ) {}
}