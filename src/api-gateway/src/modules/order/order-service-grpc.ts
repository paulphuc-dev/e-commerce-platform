import { Observable } from 'rxjs';
export interface OrderServiceGrpc {
  getOrders(data: {username: string}): Observable<any>;
  getOrderById(data: {username: string, id: string}): Observable<any>;
  Checkout(data: {username: string, method: string}): Observable<any>;
  updateStatusOrder(data: { id: string; status: string }): Observable<any>;
}