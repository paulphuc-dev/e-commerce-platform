import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/entity/base.entity';
import { OrderItem } from './order-items.entity';
@Entity('order')
export class Order extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal',{name:"total_amount"})
  totalAmount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'processing' |'delivered' | 'cancelled';

  @Column({name:"is_paid" ,default: false})
  isPaid?: boolean;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];
  
}