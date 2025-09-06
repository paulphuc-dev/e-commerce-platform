import { Observable } from 'rxjs';
export interface ProfileServiceGrpc{
    getAccounts(data?: {page: number, username?: string, role?: string}): Observable<any>;
    changePassword(id: string, newPassword: string ): Observable<any>;
    disableAccount(id: string ): Observable<any>;

    getCustomers(data?: {page: number, fullname?: string, phone?: string}): Observable<any>
    getCustomerbyId(id: string): Observable<any>
    createCustomer(data: any): Observable<any>
    updateCustomer(id: string, data: any): Observable<any>
    
    login(data: any): Observable<any>
}