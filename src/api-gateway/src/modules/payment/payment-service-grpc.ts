import { Observable } from 'rxjs';
export interface PaymentServiceGrpc {
  getPayments(data: {username: string}): Observable<any>;
  getPaymentbyId(data:{username: string, id: string}): Observable<any>;
}