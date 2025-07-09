// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartItems } from 'src/app/model/CartItems.model';
// import { CartService } from 'src/app/service/cart.service';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html',
//   styleUrls: ['./cart-page.component.css'],
// })
// export class CartPageComponent implements OnInit {
//   cartItems: CartItems[] = [];
//   deliveryFee: number = 60;

//   constructor(private cartService: CartService, private router: Router) {}

//   ngOnInit(): void {
//     this.cartItems = this.cartService.getCartItems();
//   }

//   increaseQuantity(item: CartItems): void {
//     item.quantity = (item.quantity || 0) + 1;
//     item.totalPrice = (item.price || 0) * item.quantity;
//     this.cartService.updateCartItem(item);
//   }

//   decreaseQuantity(item: CartItems): void {
//     if (item.quantity && item.quantity > 1) {
//       item.quantity -= 1;
//       item.totalPrice = (item.price || 0) * item.quantity;
//       this.cartService.updateCartItem(item);
//     }
//   }

//   // removeItemFromCart(item: CartItems): void {
//   //   this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
//   //   this.cartService.saveCartItems(this.cartItems);

//   //   this.cartService.removeItemFromCart(item);
//   // }

//   removeItemFromCart(item: CartItems): void {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: `You want to remove "${item.productName}" from the cart?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, remove it!',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Remove locally
//         this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
//         this.cartService.saveCartItems(this.cartItems);

//         // Remove from backend
//         this.cartService.removeItemFromCart(item);

//         // Success message
//         Swal.fire({
//           icon: 'success',
//           title: 'Removed!',
//           text: `"${item.productName}" has been removed from your cart.`,
//           timer: 1800,
//           showConfirmButton: false,
//         });
//       }
//     });
//   }

//   getItemsTotal(): number {
//     return this.cartItems.reduce(
//       (total, item) => total + (item.totalPrice || 0),
//       0
//     );
//   }

//   getVAT(): number {
//     return this.getItemsTotal() * 0.15;
//   }

//   getGrandTotal(): number {
//     return this.getItemsTotal() + this.getVAT() + this.deliveryFee;
//   }

//   // proceedToCheckout(): void {
//   //   this.router.navigate(['/delivery-information']);
//   //   alert('Proceeding to checkout...');
//   // }

// proceedToCheckout(): void {
//   Swal.fire({
//     icon: 'success',
//     title: 'Proceeding to Checkout...',
//     text: 'Redirecting to delivery information page',
//     showConfirmButton: false,
//     timer: 1500,
//   });

//   setTimeout(() => {
//     this.router.navigate(['/delivery-information']);
//   }, 1500);
// }

// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from 'src/app/model/CartItems.model';
import { CartService } from 'src/app/service/cart.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cartItems: CartItems[] = [];
  deliveryFee: number = 60;

  // Coupon related variables
  couponCode: string = '';
  discountAmount: number = 0;
  couponMessage: string = '';
  couponMessageColor: string = 'red';

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  // Quantity controls
  increaseQuantity(item: CartItems): void {
    item.quantity = (item.quantity || 0) + 1;
    item.totalPrice = (item.price || 0) * item.quantity;
    this.cartService.updateCartItem(item);
  }

  decreaseQuantity(item: CartItems): void {
    if (item.quantity && item.quantity > 1) {
      item.quantity -= 1;
      item.totalPrice = (item.price || 0) * item.quantity;
      this.cartService.updateCartItem(item);
    }
  }

  removeItemFromCart(item: CartItems): void {
    Swal.fire({
      title: 'Are you sure?',
      text: `You want to remove "${item.productName}" from the cart?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
        this.cartService.saveCartItems(this.cartItems);
        this.cartService.removeItemFromCart(item);
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: `"${item.productName}" has been removed from your cart.`,
          timer: 1800,
          showConfirmButton: false,
        });
        this.resetCoupon(); // reset coupon if cart changes
      }
    });
  }

  getItemsTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.totalPrice || 0),
      0
    );
  }

  getVAT(): number {
    return this.getItemsTotal() * 0.15;
  }

  getGrandTotal(): number {
    // Subtotal after discount + VAT + delivery fee
    const subtotalAfterDiscount = this.getItemsTotal() - this.discountAmount;
    return subtotalAfterDiscount + this.getVAT() + this.deliveryFee;
  }

  proceedToCheckout(): void {
    Swal.fire({
      icon: 'success',
      title: 'Proceeding to Checkout...',
      text: 'Redirecting to delivery information page',
      showConfirmButton: false,
      timer: 1500,
    });

    setTimeout(() => {
      this.router.navigate(['/delivery-information']);
    }, 1500);
  }

  // Coupon apply method
  applyCoupon(): void {
    if (!this.couponCode.trim()) {
      this.couponMessage = 'Please enter a coupon code.';
      this.couponMessageColor = 'red';
      return;
    }

    this.http
      .get<any>(
        `http://localhost:8080/apply-coupon/validate?code=${this.couponCode.trim()}`
      )
      .subscribe({
        next: (res) => {
          if (res && res.valid) {
            this.discountAmount = res.discountAmount;
            this.couponMessage = `Coupon applied! You saved ৳${this.discountAmount}`;
            this.couponMessageColor = 'green';
          } else {
            this.discountAmount = 0;
            this.couponMessage = 'Invalid or expired coupon code.';
            this.couponMessageColor = 'red';
          }
        },
        error: (err) => {
          this.discountAmount = 0;
          this.couponMessage = 'Error validating coupon. Please try again.';
          this.couponMessageColor = 'red';
          console.error('Coupon validation error:', err);
        },
      });
  }

  // Reset coupon when cart changes
  resetCoupon(): void {
    this.couponCode = '';
    this.discountAmount = 0;
    this.couponMessage = '';
  }
}
