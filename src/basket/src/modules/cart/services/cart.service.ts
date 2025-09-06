import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CartDto } from '../dto/response/cart.dto';
import { CartDetailDto } from '../dto/request/cart-detail.dto';
import { RedisService } from './redis.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class CartService {
    constructor(
        @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
        private readonly redisService: RedisService
    ) {}

    async getCart(username: string): Promise<CartDto | null> {
        const data = await this.redisService.getClient().get(`cart:${username}`);
        if (!data) {
            return null;
        }
        try {
            const rawCart = JSON.parse(data); 
            const transformedCart: CartDto = {
                id: rawCart.id,
                username: rawCart.username,
                total: rawCart.total,
                items: rawCart.items,
            };
            return transformedCart;
        } catch (err) {
            console.error('Invalid cart JSON in Redis:', err);
            return null;
        }
    }

    async addToCart(username: string, items: CartDetailDto[]): Promise<CartDto> {
        let cart = await this.getCart(username);
        let id = uuidv4();
        let modifiedAt = new Date();
        let total = 0;
        // Nếu cart null thì khởi tạo mới
        if (!cart) {
            cart = {
                id,
                modifiedAt,
                username,
                total,
                items: []
            } as CartDto;
        }

        if (!cart.items) {
            cart.items = [];
        }

        // Gộp thêm sản phẩm mới
        for (const item of items) {
            const existing = cart.items.find(i => i.productId === item.productId);
            if (existing) {
                existing.quantity += item.quantity;
                existing.subTotal = existing.quantity * existing.unitPrice;
            } else {
                cart.items.push({
                    cartId: cart.id ?? null, // cart.id có thể null nếu chưa lưu DB
                    productId: item.productId,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    subTotal: item.quantity * item.unitPrice,
                });
            }
        }
        cart.total = cart.items.reduce((sum, item) => sum + item.subTotal, 0);
        await this.redisService.getClient().set(
            `cart:${username}`,
            JSON.stringify(cart),
            'EX',
            60 * 60 * 24
        );
        return cart;
    }


    private cartKey(username: string) {
        return `cart:${username}`;
    }

    async clearCart(username: string) {
        await this.redisService.getClient().del(this.cartKey(username));
        return [];
    }

    async Order(username: string) {
        const cartData = await this.getCart(username);
        if (!cartData) {
            throw new Error('Cart is empty');
        }
        this.orderClient.emit('order.checkout', cartData); 
        await this.clearCart(username);
        return { message: 'Checkout successful', cartData };
    }
}
