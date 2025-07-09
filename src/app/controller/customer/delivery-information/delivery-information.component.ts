import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { Order, OrderStatus } from 'src/app/model/Order.model';
import { OrderService } from 'src/app/service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delivery-information',
  templateUrl: './delivery-information.component.html',
  styleUrls: ['./delivery-information.component.css'],
})
//Old working code start

// export class DeliveryInformationComponent implements OnInit {
//   deliveryData = {
//     name: '',
//     phone: '',
//     address: '',
//   };

//   constructor(private router: Router) {}
//   ngOnInit(): void {}

//   proceedToPaymentMethod() {
//     localStorage.setItem('deliveryInfo', JSON.stringify(this.deliveryData));
//     this.router.navigate(['/payment']);

//     console.log("hello")
//   }
// }

// working code end
export class DeliveryInformationComponent implements OnInit, OnDestroy {
  // deliveryData = {
  //   name: '',
  //   phone: '',
  //   address: '',
  // };

  // pollingSubscription!: Subscription;
  // latestOrderId!: number;

  // constructor(private router: Router, private orderService: OrderService) {}

  // ngOnInit(): void {}

  // proceedToPaymentMethod() {
  //   const order: Order = {
  //     customerName: this.deliveryData.name,
  //     phone: this.deliveryData.phone,
  //     address: this.deliveryData.address,
  //     date: new Date(),
  //     orderCode: 'ORD' + Date.now(),
  //     approved: false,
  //     status: OrderStatus.PENDING,
  //     items: [],
  //     subtotal: 0,
  //     vat: 0,
  //     deliveryFee: 0,
  //     total: 0,
  //     paymentMethod: undefined,
  //   };

  //   this.orderService.createOrder(order).subscribe({
  //     next: (savedOrder) => {
  //       this.latestOrderId = savedOrder.id!;
  //       console.log(savedOrder);
  //       alert('🕓 Waiting for admin approval...');
  //       this.startPollingApproval(this.latestOrderId);
  //     },
  //     error: (err) => {
  //       alert('❌ Error placing order');
  //       console.error(err);
  //     },
  //   });
  // }

  // startPollingApproval(orderId: number) {
  //   this.pollingSubscription = interval(5000).subscribe(() => {
  //     this.orderService.checkOrderApproval(orderId).subscribe((approved) => {
  //       if (approved) {
  //         alert('✅ Order Approved by Admin!');
  //         this.pollingSubscription.unsubscribe();
  //         this.router.navigate(['/payment']);
  //       }
  //     });
  //   });
  // }

  // ngOnDestroy(): void {
  //   if (this.pollingSubscription) {
  //     this.pollingSubscription.unsubscribe();
  //   }
  // }

  deliveryData = {
    name: '',
    phone: '',
    address: '',
  };

  pollingSubscription!: Subscription;
  latestOrderId!: number;

  constructor(private router: Router, private orderService: OrderService) {}

  ngOnInit(): void {}

  proceedToPaymentMethod() {
    const order: Order = {
      customerName: this.deliveryData.name,
      phone: this.deliveryData.phone,
      address: this.deliveryData.address,
      date: new Date(),
      orderCode: 'ORD' + Date.now(),
      approved: false,
      status: OrderStatus.PENDING,
      items: [],
      subtotal: 0,
      vat: 0,
      deliveryFee: 0,
      total: 0,
      paymentMethod: undefined,
    };
    localStorage.setItem('deliveryInfo', JSON.stringify(this.deliveryData));
    this.orderService.createOrder(order).subscribe({
      next: (savedOrder) => {
        this.latestOrderId = savedOrder.id!;
        console.log(savedOrder);

        // Show SweetAlert waiting for approval
        Swal.fire({
          icon: 'info',
          title: '🕓 Please Wait...',
          text: 'Your order is placed. Waiting for admin approval!',
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        this.startPollingApproval(this.latestOrderId);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: '❌ Failed!',
          text: 'Something went wrong while placing your order!',
        });
        console.error(err);
      },
    });
  }

  startPollingApproval(orderId: number) {
    this.pollingSubscription = interval(5000).subscribe(() => {
      this.orderService.checkOrderApproval(orderId).subscribe((approved) => {
        if (approved) {
          this.pollingSubscription.unsubscribe();

          Swal.close(); // Close the "waiting" alert

          Swal.fire({
            icon: 'success',
            title: '✅ Approved!',
            text: 'Your order has been approved by admin!',
            timer: 1500,
          }).then(() => {
            this.router.navigate(['/payment']);
          });
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSubscription) {
      this.pollingSubscription.unsubscribe();
    }
  }
}
