import { HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from '../impls/get-product.query';
import { ProductService } from '../../services/product.service';
import { ProductsResponseDto } from '../../dto/response/products.response.dto';
import { Message } from '../../enums/notification';
@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {

  constructor(private readonly productService: ProductService) {}
  async execute(query: GetProductsQuery): Promise<ProductsResponseDto> {
    const { page, id, name } = query;
    const pagination = await this.productService.getProducts( page, id, name);
    const raw = {
      status: HttpStatus.OK,
      message: Message.GET_ALL_SUCCESSFULLY,
      pagination
    };
    const response = plainToInstance(ProductsResponseDto, raw, {
      excludeExtraneousValues: true,
    });
    return response
  }
}