import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ProductServiceGrpc } from './product-service-grpc';
@Injectable()
export class ProductsService implements OnModuleInit{
    private productService: ProductServiceGrpc;
    constructor(
      @Inject('PRODUCT_SERVICE') private readonly client: ClientGrpc
    ) {}
  
    onModuleInit() {
      this.productService = this.client.getService<ProductServiceGrpc>('ProductService');
    }

    getProducts(page: number = 1, id?: string, name?: string) {
      if (!id && !name) {
        return this.productService.getProducts({page});
      }
      const data: any = {};
      data.page = page;
      if (id) data.id = id;
      if (name) data.name = name;
      return this.productService.getProducts(data);
    }

    getProductById(id: string){
      return this.productService.getProductById({id});
    }

    createProduct(data: any) {
      return this.productService.createProduct(data);
    }

    updateProduct(id: string, update: any) {
      return this.productService.updateProduct({id, update});
    }

    deleteProduct(id: string) {
      return this.productService.deleteProduct({id});
    }
}