import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductByIdQuery } from '../impls/get-product-by-id.query';
import { ProductService } from '../../services/product.service';
import { ProductResponseDto } from '../../dto/response/product.response.dto';
import { Message } from '../../enums/notification';
@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler implements IQueryHandler<GetProductByIdQuery> {
  constructor(private readonly productService: ProductService) {}

  async execute(query: GetProductByIdQuery): Promise<ProductResponseDto> {
    const { id } = query;
    const product = await this.productService.getProductById(id);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_BY_ID_SUCCESSFULLY,
      product
    }
    const response = plainToInstance(ProductResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response; 
  }
}
