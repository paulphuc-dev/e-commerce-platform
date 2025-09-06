import { Observable } from 'rxjs';
export interface CartServiceGrpc {
  getCart(data: {username: string}): Observable<any>;
  addToCart(data: {username: string, items: any[]}): Observable<any>;
  Order(data: {username: string}): Observable<any>;
}