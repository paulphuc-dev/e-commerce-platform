import { Injectable, Inject, OnModuleInit, InternalServerErrorException} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CartServiceGrpc } from './cart-service-grpc';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class CartService implements OnModuleInit{
    private cartService: CartServiceGrpc;
    constructor(
      @Inject('CART_SERVICE') private readonly client: ClientGrpc
    ) {}
  
    onModuleInit() {
      this.cartService = this.client.getService<CartServiceGrpc>('CartService');
    }

    async getCart(username: string){
      return this.cartService.getCart({username});
    }

    addToCart(username: string, items: any[]) {
      return this.cartService.addToCart({username, items});
    }

    Order(username: string) {
      return this.cartService.Order({username});
    }
}