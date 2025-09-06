import { Column } from 'typeorm';
export class BaseEntity{
    @Column()
    username: string;

    @Column({name:"modified_at"})
    modifiedAt: Date;
}