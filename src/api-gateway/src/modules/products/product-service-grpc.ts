import { Observable } from 'rxjs';
export interface ProductServiceGrpc {
  getProducts(data? :{page: number, id?:string, name?:string}): Observable<any>;
  getProductById(data: {id: string }): Observable<any>;
  createProduct(data: any): Observable<any>
  updateProduct(data:{id: string, update: any }): Observable<any>;
  deleteProduct(data:{id: string}): Observable<any>;
}