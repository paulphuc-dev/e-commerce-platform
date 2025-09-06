import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../impls/update-product.command';
import { ProductResponseDto } from '../../dto/response/product.response.dto';
import { ProductService } from '../../services/product.service';
import { UpdateProductRequestDto } from './../../dto/request/update-product.request.dto';
import { Message } from '../../enums/notification';
@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler implements ICommandHandler<UpdateProductCommand> {
  constructor(private readonly productService: ProductService) {}
  async execute(command: UpdateProductCommand): Promise<ProductResponseDto> {
    const id: string = command.id;
    const update: UpdateProductRequestDto = command.update;
    const product = await this.productService.updateProduct(id, update)
    const raw = {
      status: HttpStatus.OK,
      message: Message.UPDATE_SUCCESSFULLY,
      product
    }
    const response = plainToInstance(ProductResponseDto, raw,{excludeExtraneousValues: true});
    return response;
  }
}