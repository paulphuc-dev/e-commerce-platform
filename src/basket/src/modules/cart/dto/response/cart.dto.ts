import { Expose, Type } from "class-transformer";
import { Item } from "./items.dto";
export class CartDto{
    @Expose()
    id: string;
    
    @Expose()
    username: string; 

    @Expose()
    total: number;

    @Expose()
    @Type(() => Item)
    items: Item[];
}