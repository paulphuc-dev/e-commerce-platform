import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/base/entities/base.entity';

@Entity('product')
export class Product extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('text')
  description: string;
  
  @Column({ default: 0 })
  stock: number;
  
  @Column('decimal',{name:"unit_price"})
  price: number;

  @Column({ default: true, name:"is_active" })
  isActive: boolean;

  @Column({ nullable: true })
  avatarUrl?: string | null;
}