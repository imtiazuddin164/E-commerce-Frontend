import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Delivery } from '../model/deliveryinfo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {
// private Url = 'http://localhost:8080/pharma/delivery'; // Your backend URL
  private Url = 'http://localhost:3000/delivery';

  constructor(private http: HttpClient) {}

  // Save delivery data (POST)
  saveDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.Url, delivery);
  }

  // Get all delivery data (GET)
  // getDeliveries(): Observable<Delivery[]> {
  //   return this.http.get<Delivery[]>(this.Url);
  // }
  getDeliveries(): Observable<Delivery[]> {
  return this.http.get<Delivery[]>(this.Url);
}

  // Optional: Get delivery by ID (GET)
  getDeliveryById(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(`${this.Url}/${id}`);
  }
}
