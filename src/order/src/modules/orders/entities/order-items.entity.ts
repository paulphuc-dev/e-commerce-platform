import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './order.entity';
@Entity('order_item')
export class OrderItem{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name:'order_id'})
  orderId: string;

  @Column({name:'products_id'})
  productsId: string;

  @Column('int')
  quantity: number;

  @Column('decimal',{name:"unit_price"})
  unitPrice: number;

  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

}