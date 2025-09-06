import { Expose } from "class-transformer";
export class CustomerDataResponseDto{
    @Expose()
    id: string;

    @Expose()
    fullName: string;

    @Expose()
    age: number;

    @Expose()
    phone: string;

    @Expose()
    address: string;

    @Expose()
    createdAt: Date;
}