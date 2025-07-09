import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../model/Coupon.model';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  // private baseUrl = 'http://localhost:3000/coupons';
  private baseUrl = 'http://localhost:8080/coupon';

  constructor(private http: HttpClient) {}

  getCouponByCode(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(`${this.baseUrl}/${code}`);
  }

  getAllCoupons(): Observable<Coupon[]> {
  return this.http.get<Coupon[]>(this.baseUrl);
}

addCoupon(coupon: Coupon): Observable<Coupon> {
  return this.http.post<Coupon>(this.baseUrl, coupon);
}

updateCoupon(id: number, coupon: Coupon): Observable<any> {
  return this.http.put(`${this.baseUrl}/${id}`, coupon);
}

deleteCoupon(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`);
}

}
