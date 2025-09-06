import { Controller} from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddToCartCommand } from '../commands/impls/add-to-cart.command';
import { CheckoutCommand } from '../commands/impls/checkout.command';
import { GetCartQuery } from '../queries/impls/get-cart-by-user.query';
@Controller()
export class CartController {
    constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus){}
    @GrpcMethod('CartService', 'GetCart')
    async getCart(data:{username: string}) {
        console.log("OK connected !");
        console.log(data);
        return this.queryBus.execute(new GetCartQuery(data.username));
    }
    
    @GrpcMethod('CartService', 'AddToCart')
    async addToCart(data:{ username: string, items: any}){
        return this.commandBus.execute(new AddToCartCommand(data.username, data.items));
    }

    @GrpcMethod('CartService','Order')
    async Order(data:{username: string}){
        return this.commandBus.execute(new CheckoutCommand(data.username));
    }
}
