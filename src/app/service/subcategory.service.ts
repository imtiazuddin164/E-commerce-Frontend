import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Subcategory } from '../model/Subcategory.model';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  // private apiUrl = 'http://localhost:3000/subcategories';
  private apiUrl = 'http://localhost:8080/subcategory';

  constructor(private http: HttpClient) {}

  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(this.apiUrl);
  }

  addSubcategory(subcategory: Subcategory): Observable<Subcategory> {
    return this.http.post<Subcategory>(this.apiUrl, subcategory);
  }

  updateSubcategory(id: number, subcategory: Subcategory): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, subcategory);
  }

  deleteSubcategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
