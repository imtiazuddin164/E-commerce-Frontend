import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { Product } from '../model/Product.model';
import { Order, OrderItem } from '../model/Order.model';

export interface SalesItemDetail {
  name: string;
  quantity: number;
  price: number;
  total: number;
  date: string;
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class SalesReportsService {
  private productUrl = 'http://localhost:8080/product';
  private orderUrl = 'http://localhost:8080/orders';

  constructor(private http: HttpClient) {}

  // 1️⃣ API থেকে সব Order & Product আনবে
  getSalesReportData(): Observable<{ orders: Order[]; products: Product[] }> {
    return forkJoin({
      products: this.http.get<Product[]>(this.productUrl),
      orders: this.http.get<Order[]>(this.orderUrl),
    });
  }

  // 2️⃣ Order list থেকে item গুলো বের করে (সহজ করার জন্য)
  extractItems(orders: Order[]): OrderItem[] {
    return orders.flatMap(order =>
      (order.items || []).map(item => ({
        ...item,
        orderDate: order.date?.toString(),
      }))
    );
  }

  // 3️⃣ Sales Amount হিসাব করে (range অনুযায়ী)
  calculateSales(items: OrderItem[], range: 'day' | 'month' | 'year'): number {
    const now = new Date();

    return items
      .filter(item => {
        if (!item.orderDate) return false;
        const date = new Date(item.orderDate);
        if (range === 'day') {
          return date.toDateString() === now.toDateString();
        } else if (range === 'month') {
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        } else if (range === 'year') {
          return date.getFullYear() === now.getFullYear();
        }
        return false;
      })
      .reduce((sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 0), 0);
  }

  // 4️⃣ ডিটেইলস লিস্ট বানাবে (date + time সহ)
  groupDetailedSales(items: OrderItem[], range: 'day' | 'month' | 'year'): SalesItemDetail[] {
    const now = new Date();

    const filtered = items.filter(item => {
      if (!item.orderDate) return false;
      const date = new Date(item.orderDate);
      if (range === 'day') {
        return date.toDateString() === now.toDateString();
      } else if (range === 'month') {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      } else if (range === 'year') {
        return date.getFullYear() === now.getFullYear();
      }
      return false;
    });

    return filtered.map(item => {
      const dateObj = new Date(item.orderDate!);
      return {
        name: item.name ?? 'Unknown',
        quantity: item.quantity ?? 0,
        price: item.price ?? 0,
        total: (item.quantity ?? 0) * (item.price ?? 0),
        date: dateObj.toLocaleDateString(),
        time: dateObj.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
    });
  }
}
