import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from 'src/app/model/CartItems.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

 cartItems: CartItems[] = [];
  itemsPrice = 0;
  deliveryFee = 60;
  vatRate = 0.15;
  subtotal = 0;
  vat = 0;
  grandTotal = 0;

  constructor(private cartService: CartService, private router : Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateSummary();
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
    return this.getItemsTotal() + this.getVAT() + this.deliveryFee;
  }

  //  proceedToCheckout(): void {
  //   // alert('Proceeding to checkout...');
  //    this.router.navigate(['/payment']);
  // }

  calculateSummary(): void {
    this.itemsPrice = this.cartItems.reduce((sum, item) => {
    const price = item.price ?? 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
    }, 0);

    this.subtotal = this.itemsPrice + this.deliveryFee;
    this.vat = this.subtotal * this.vatRate;
    this.grandTotal = this.subtotal + this.vat;
  }
}
