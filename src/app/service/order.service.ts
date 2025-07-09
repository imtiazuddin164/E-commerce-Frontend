import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../model/Order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  // deleteOrder(id: number) {

  // }
  // private baseUrl = 'http://localhost:3000/orders';
  private baseUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  // placeOrder(order: Order): Observable<Order> {
  //   return this.http.post<Order>(this.baseUrl, order);
  // }

  // getAllOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.baseUrl);
  // }

  // getUserOrders(userId: number): Observable<Order[]> {
  //   return this.http.get<Order[]>(`${this.baseUrl}/user/${userId}`);
  // }

  // Working code Start

  // deleteOrder(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }

  // // POST order to backend
  // createOrder(order: Order): Observable<Order> {
  //   return this.http.post<Order>(this.baseUrl, order);
  // }

  // // GET all orders from backend
  // getOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(this.baseUrl);
  // }

  // Working code end

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order);
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  checkOrderApproval(orderId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-approval/${orderId}`);
  }

  approveOrder(orderId: number): Observable<string> {
    return this.http.put(`${this.baseUrl}/approve/${orderId}`, null, {
      responseType: 'text',
    });
  }
}
