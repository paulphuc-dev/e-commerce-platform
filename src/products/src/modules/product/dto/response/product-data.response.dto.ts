import { Expose } from "class-transformer";
export class ProductDataResponseDto{
    @Expose()
    id: string;

    @Expose()
    name: string;
        
    @Expose()
    description: string;
          
    @Expose()
    stock: number;
          
    @Expose()
    price: number;
        
    @Expose()
    isActive: boolean;

    @Expose()
    avatarUrl?: string;
    
    @Expose()
    username: string;
}