import { firstValueFrom } from 'rxjs';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository} from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { OrderException } from '../enums/notifications';
import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-items.entity';
import { OrderRequestDto } from '../dto/request/order.request.dto';
import { OrderDto } from '../dto/response/order.dto';
import { PaymentResponseDto } from '../dto/response/payment.response.dto';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepo: Repository<OrderItem>,
    @Inject('PAYMENT_SERVICE')
    private readonly paymentClient: ClientProxy,
  ) {}
  
  async getOrders(username: string): Promise<OrderDto[]> {
    const query = await this.orderRepo.createQueryBuilder('order')
    query.andWhere('order.username = :username', { username });
    const data = await query.orderBy('order.modifiedAt', 'DESC').getMany();
    const res = plainToInstance(OrderDto, data, {excludeExtraneousValues: true})
    return res; 
  }

  async getOrderById(username: string, id: string): Promise<OrderDto | null> {
    const data = await this.orderRepo.findOne({
      where: { id, username },
      relations: ['items'], 
    });
    const res = plainToInstance(OrderDto, data, {excludeExtraneousValues: true});
    return res;
  }

  async createOrder(dto: OrderRequestDto): Promise<OrderDto> {
    const order = await this.orderRepo.save({
      totalAmount: dto.total,
      status: 'pending',
      isPaid: false,
      username: dto.username,
      modifiedAt: new Date(),
    });

    // Gán orderId cho từng item và tạo entity từ DTO
    const items = dto.items.map(item =>
      this.orderItemRepo.create({
        orderId: order.id,
        productsId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      })
    );
    // Gán lại vào order
    order.items = items;
    const data = await this.orderRepo.save(order);
    const res = plainToInstance(OrderDto, data, {excludeExtraneousValues: true});
    return res;
  }

  async Checkout(username: string, method: string): Promise<string> {
    let notification: string;
    const data = await this.orderRepo.findOne({
      where: {
        username,
        status: 'pending'
      },
    });

    if (!data) {
      notification = "Không tìm thấy đơn hàng !"
      return notification;
    }
    const payment = plainToInstance(PaymentResponseDto, data, {
      excludeExtraneousValues: true,
    });
    payment.paymentMethod = method;

    const momoRes = await firstValueFrom(
      this.paymentClient.send('order_created', payment),
    );
    //console.log(momoRes);
    data.isPaid = true;
    notification = "Bạn hãy thanh toán: "+ momoRes.transaction.payUrl;
    return notification;
  }

  async updateOrderStatus(id: string, status: 'pending' | 'processing' | 'delivered' | 'cancelled'): Promise<OrderDto> {
    const existing = await this.orderRepo.findOne({where:{id}});
    if(!existing){
      throw new NotFoundException(OrderException.NOTFOUND);
    }
    existing.status = status;
    const saved = await this.orderRepo.save(existing);
    const res = plainToInstance(OrderDto,saved,{excludeExtraneousValues: true});
    return res;
  }

}
