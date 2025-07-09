import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrderItem } from 'src/app/model/Order.model';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  // selectedMethod: string = '';
  // paymentData: any = {
  //   mobileType: '',
  //   mobileNumber: '',
  //   transactionId: '',
  //   fullName: '',
  //   cardNumber: '',
  //   expiryDate: '',
  //   cvv: '',
  //   address: '',
  // };

  // constructor(private router: Router) {}

  // ngOnInit(): void {}

  // // submitPayment() {
  // //   console.log('Submitting Payment:', this.selectedMethod, this.paymentData);
  // //   alert('Payment Submitted Successfully!');
  // //   // Logic to process payment goes here
  // // }

  // submitPayment(): void {
  //   if (this.selectedMethod === '') {
  //     alert('Please select a payment method.');
  //     return;
  //   }

  //   if (this.selectedMethod === 'card') {
  //     if (
  //       !this.paymentData.fullName ||
  //       !/^\d{16}$/.test(this.paymentData.cardNumber) ||
  //       !this.paymentData.expiryDate ||
  //       !/^\d{3}$/.test(this.paymentData.cvv)
  //     ) {
  //       alert('Please enter valid card information.');
  //       return;
  //     }
  //   }

  //   if (this.selectedMethod === 'mobile') {
  //     if (!this.paymentData.mobileNumber || !this.paymentData.transactionId) {
  //       alert('Please enter mobile payment info.');
  //       return;
  //     }
  //   }

  //   if (this.selectedMethod === 'cod' && !this.paymentData.address) {
  //     alert('Please enter delivery address.');
  //     return;
  //   }

  //   alert(
  //     '✅ Payment processed successfully using: ' +
  //       this.selectedMethod.toUpperCase()
  //   );
  //   this.router.navigate(['/invoice']);
  // }

  //new with model and service

  selectedMethod: string = '';
  paymentData: any = {
    mobileType: '',
    mobileNumber: '',
    transactionId: '',
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
  };

  constructor(
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    // no special init needed
  }

  generateRandomCode(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  submitPayment(): void {
    if (this.selectedMethod === '') {
      alert('Please select a payment method.');
      return;
    }

    if (this.selectedMethod === 'card') {
      if (
        !this.paymentData.fullName ||
        !/^\d{16}$/.test(this.paymentData.cardNumber) ||
        !this.paymentData.expiryDate ||
        !/^\d{3}$/.test(this.paymentData.cvv)
      ) {
        alert('Please enter valid card information.');
        return;
      }
    }

    if (this.selectedMethod === 'mobile') {
      if (
        !this.paymentData.mobileNumber ||
        !this.paymentData.transactionId ||
        !this.paymentData.mobileType
      ) {
        alert('Please complete mobile banking info.');
        return;
      }
    }

    const deliveryData = JSON.parse(
      localStorage.getItem('deliveryInfo') || '{}'
    );


    const cartItems = this.cartService.getCartItems();

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      name: item.productName, // cart item e jodi productName thake
      quantity: item.quantity,
      price: item.price,
    }));

    const order: Order = {
      orderCode: this.generateRandomCode(),
      date: new Date(),
      customerName: deliveryData.name,
      phone: deliveryData.phone,
      paymentMethod: this.selectedMethod as 'cod' | 'card' | 'mobile',
      mobileType: this.paymentData.mobileType || null,
      address: deliveryData.address,
      items: orderItems,
      subtotal: this.cartService.getCartTotal(),
      vat: this.cartService.getCartTotal() * 0.15,
      deliveryFee: 60,
      total: this.cartService.getCartTotal() * 1.15 + 60,
    };

    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        // Swal.fire({
        //   position: 'center',
        //   icon: 'success',
        //   title: 'Payment Complete Successfully',
        //   showConfirmButton: false,
        //   timer: 1500,
        // });

        Swal.fire({
          icon: 'success',
          title: 'Payment Successful',
          text: 'Thank you! Your payment has been completed successfully.',
          confirmButtonText: 'OK',
        });

        this.cartService.clearCart();
        localStorage.setItem('latestOrder', JSON.stringify(order));
        this.router.navigate(['/invoice']);
      },
      error: (error) => {
        alert('Failed to save order. Please try again.');
        console.error('Order save error:', error);
      },
    });
  }
}
