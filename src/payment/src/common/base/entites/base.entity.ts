import { Column } from 'typeorm';
export class BaseEntity {
    @Column()
    username: string;
    
    @Column({name:"paid_at"})
    paidAt: Date;
}