import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impls/create-product.command';
import { ProductRequestDto } from '../../dto/request/create-product.request.dto';
import { ProductResponseDto } from '../../dto/response/product.response.dto';
import { ProductService } from '../../services/product.service';
import { Message } from '../../enums/notification';
@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
  constructor(private readonly productsService: ProductService) {}
  async execute(command: CreateProductCommand): Promise<ProductResponseDto> {
    const data: ProductRequestDto = command.data;
    const product = await this.productsService.createProduct(data);
    const raw = {
      status: HttpStatus.OK,
      message: Message.CREATE_SUCCESSFULLY,
      product 
    }
    const response = plainToInstance(ProductResponseDto, raw,{excludeExtraneousValues:true});
    return response;
  }
}