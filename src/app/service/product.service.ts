import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/product'; // Spring Boot Server URL
  // private apiUrl = 'http://localhost:3000/products'; // Spring Boot Server URL

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/` + id);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/` + id, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addProductWithImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveProductWithImage`, formData); // Make sure backend has `/upload` endpoint
  }

  updateProductWithImage(formData: FormData): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateProductWithImage`, formData);
}

}
