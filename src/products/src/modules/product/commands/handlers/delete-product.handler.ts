import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../impls/delete-product.command';
import { ProductResponseDto } from '../../dto/response/product.response.dto';
import { ProductService } from '../../services/product.service';
import { Message } from '../../enums/notification';
@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler implements ICommandHandler<DeleteProductCommand> {
  constructor(private readonly productService: ProductService) {}
  async execute(command: DeleteProductCommand): Promise<ProductResponseDto> {
    const id: string = command.id;
    const product = await this.productService.deleteProduct(id)
    const raw = {
      status: HttpStatus.OK,
      message: Message.DELETE_SUCCESSFULLY,
      product
    }
    const response = plainToInstance(ProductResponseDto, raw,{excludeExtraneousValues: true});
    return response;
  }
}