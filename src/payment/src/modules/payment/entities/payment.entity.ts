import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from '../../../common/base/entites/base.entity';
@Entity('payment')
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'order_id'})
  orderId: string;

  @Column('decimal')
  amount: number;

  @Column()
  method: string; 

  @Column({ default: 'success' })
  status: 'success' | 'failed';
}