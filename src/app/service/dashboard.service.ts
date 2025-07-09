import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Product } from '../model/Product.model';
import { Order } from '../model/Order.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private productUrl = 'http://localhost:8080/product';
  private orderUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    return forkJoin({
      products: this.http.get<Product[]>(this.productUrl),
      orders: this.http.get<Order[]>(this.orderUrl),
    });
  }
}
