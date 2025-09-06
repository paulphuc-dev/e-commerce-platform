import { Controller} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands/impls/create-product.command';
import { UpdateProductCommand } from './../commands/impls/update-product.command';
import { DeleteProductCommand } from '../commands/impls/delete-product.command';
import { GetProductsQuery } from '../queries/impls/get-product.query';
import { GetProductByIdQuery } from '../queries/impls/get-product-by-id.query';
@Controller()
export class ProductController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus){}

  @GrpcMethod('ProductService', 'GetProducts')
  async getProducts(data:{page: number, id?: string, name?: string}) {
    return this.queryBus.execute(new GetProductsQuery(data.page, data.id, data.name))
  }

  @GrpcMethod('ProductService', 'GetProductById')
  async getProductbyId(data:{id: string}) {
    return this.queryBus.execute(new GetProductByIdQuery(data.id))
  }

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProduct(data: any) {
    return this.commandBus.execute(new CreateProductCommand(data));
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProduct(data: {id: string, update: any}) {
    return this.commandBus.execute(new UpdateProductCommand(data.id, data.update));
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProduct(data:{id: string}) {
    return this.commandBus.execute(new DeleteProductCommand(data.id));
  }
}
