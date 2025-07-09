// import { Injectable } from '@angular/core';
// import { CartItems } from '../model/CartItems.model';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   private cartKey = 'cartItems';
//   private baseUrl = 'http://localhost:8080/cartItems';

//   constructor(private http: HttpClient) {}

//   getCartItems(): CartItems[] {
//     const data = localStorage.getItem(this.cartKey);
//     return data ? JSON.parse(data) : [];
//   }

//   saveCartItems(items: CartItems[]): void {
//     localStorage.setItem(this.cartKey, JSON.stringify(items));
//   }

//   addToCart(product: CartItems): void {
//     const cart = this.getCartItems();
//     const existingItem = cart.find(
//       (item) => item.productId === product.productId
//     );

//     if (existingItem) {
//       existingItem.quantity = (existingItem.quantity ?? 0) + 1;
//       existingItem.totalPrice =
//         (existingItem.price ?? 0) * existingItem.quantity;

//       this.updateCartItem(existingItem);
//     } else {
//       product.quantity = 1;
//       product.totalPrice = product.price ?? 0;

//       this.http.post<CartItems>(`${this.baseUrl}/`, product).subscribe({
//         next: (res) => {
//           product.id = res.id;
//           cart.push(product);
//           this.saveCartItems(cart);
//         },
//         error: (err) => {
//           console.error('Error saving to backend:', err);
//         },
//       });
//     }

//     this.saveCartItems(cart);
//   }

//   updateCartItem(cartItem: CartItems): void {
//     const cart = this.getCartItems();
//     const index = cart.findIndex(
//       (item) => item.productId === cartItem.productId
//     );

//     if (index !== -1) {
//       cart[index] = cartItem;
//       this.saveCartItems(cart);
//     }

//     this.http.put(`${this.baseUrl}/${cartItem.id}`, cartItem).subscribe({
//       next: () => console.log('Cart item updated on backend'),
//       error: (err) => console.error('Error updating cart on backend:', err),
//     });
//   }

//   removeItemFromCart(item: CartItems): void {
//     const cart = this.getCartItems().filter(
//       (i) => i.productId !== item.productId
//     );
//     this.saveCartItems(cart);

//     this.http.delete(`${this.baseUrl}/${item.id}`).subscribe({
//       next: () => console.log('Item deleted from backend'),
//       error: (err) => console.error('Error deleting item from backend:', err),
//     });
//   }

//   clearCart(): void {
//     localStorage.removeItem(this.cartKey);
//   }

//   getCartItemCount(): number {
//     return this.getCartItems().reduce(
//       (count, item) => count + (item.quantity ?? 0),
//       0
//     );
//   }

//   getCartTotal(): number {
//     return this.getCartItems().reduce(
//       (sum, item) => sum + (item.totalPrice ?? 0),
//       0
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { CartItems } from '../model/CartItems.model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

export interface CouponResponse {
  discountAmount: number;
  type: 'PERCENT' | 'AMOUNT';
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cartItems';
  private baseUrl = 'http://localhost:8080/cartItems';
  private couponApi = 'http://localhost:8080/api/apply-coupon';

  private coupon: CouponResponse | null = null;
  private discountedTotalSubject = new BehaviorSubject<number>(0);

    // 🔹 Cart Count Subject
  private cartItemCountSubject = new BehaviorSubject<number>(this.getCartItemCount());
 getCartItemCountObservable(): Observable<number> {
  return this.cartItemCountSubject.asObservable();
}

private updateCartItemCount(): void {
  this.cartItemCountSubject.next(this.getCartItemCount());
}

  constructor(private http: HttpClient) {}

  // 🔹 Coupon Apply from backend
  applyCoupon(code: string): Observable<CouponResponse> {
    return this.http.get<CouponResponse>(`${this.couponApi}?code=${code}`);
  }

  setCoupon(coupon: CouponResponse) {
    this.coupon = coupon;
    this.updateDiscountedTotal();
  }

  removeCoupon() {
    this.coupon = null;
    this.updateDiscountedTotal();
  }

  // 🔹 All existing methods (as before)
  getCartItems(): CartItems[] {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  saveCartItems(items: CartItems[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
    this.updateDiscountedTotal(); // update discount if cart changes
  }

  addToCart(product: CartItems): void {
    const cart = this.getCartItems();
    const existingItem = cart.find(
      (item) => item.productId === product.productId
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 0) + 1;
      existingItem.totalPrice =
        (existingItem.price ?? 0) * existingItem.quantity;
      this.updateCartItem(existingItem);
    } else {
      product.quantity = 1;
      product.totalPrice = product.price ?? 0;

      this.http.post<CartItems>(`${this.baseUrl}/`, product).subscribe({
        next: (res) => {
          product.id = res.id;
          cart.push(product);
          this.saveCartItems(cart);
        },
        error: (err) => console.error('Error saving to backend:', err),
      });
    }

    this.saveCartItems(cart);
    this.updateCartItemCount();
  }

  updateCartItem(cartItem: CartItems): void {
    const cart = this.getCartItems();
    const index = cart.findIndex(
      (item) => item.productId === cartItem.productId
    );

    if (index !== -1) {
      cart[index] = cartItem;
      this.saveCartItems(cart);
    }

    this.http.put(`${this.baseUrl}/${cartItem.id}`, cartItem).subscribe({
      next: () => console.log('Cart item updated on backend'),
      error: (err) => console.error('Error updating cart on backend:', err),
    });
  }

  removeItemFromCart(item: CartItems): void {
    const cart = this.getCartItems().filter(
      (i) => i.productId !== item.productId
    );
    this.saveCartItems(cart);

    this.http.delete(`${this.baseUrl}/${item.id}`).subscribe({
      next: () => console.log('Item deleted from backend'),
      error: (err) => console.error('Error deleting item from backend:', err),
    });
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
    this.removeCoupon(); // coupon reset
  }

  getCartItemCount(): number {
    return this.getCartItems().reduce(
      (count, item) => count + (item.quantity ?? 0),
      0
    );
  }

  getCartTotal(): number {
    return this.getCartItems().reduce(
      (sum, item) => sum + (item.totalPrice ?? 0),
      0
    );
  }

  // 🔹 Discounted Total Logic
  private updateDiscountedTotal(): void {
    const total = this.getCartTotal();
    let discounted = total;

    if (this.coupon) {
      if (this.coupon.type === 'PERCENT') {
        discounted = total - (total * this.coupon.discountAmount) / 100;
      } else if (this.coupon.type === 'AMOUNT') {
        discounted = total - this.coupon.discountAmount;
      }
      if (discounted < 0) discounted = 0;
    }

    this.discountedTotalSubject.next(discounted);
  }

  getDiscountedTotal(): Observable<number> {
    return this.discountedTotalSubject.asObservable();
  }
}
