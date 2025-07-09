import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'src/app/model/Order.model';
import { OrderService } from 'src/app/service/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css'],
})
export class OrderManagementComponent implements OnInit {
  //working code start

  // orders: Order[] = [];

  // constructor(private orderService: OrderService) {}

  // ngOnInit(): void {
  //   this.loadOrders();
  // }

  // loadOrders(): void {
  //   this.orderService.getOrders().subscribe({
  //     next: (data) => (this.orders = data),
  //     error: (err) => console.error('Error loading orders', err),
  //   });
  // }

  // deleteOrder(id: number): void {
  //   this.orderService.deleteOrder(id).subscribe(() => {
  //     this.orders = this.orders.filter((o) => o.id !== id);
  //   });
  // }

  // getTotalItems(order: Order): number {
  //   if (!order.items) return 0;
  //   return order.items.reduce((total, item) => total + (item.quantity || 0), 0);
  // }

  // working code end

  //   orders: Order[] = [];

  // constructor(private orderService: OrderService) {}

  // ngOnInit(): void {
  //   this.loadOrders();
  // }

  // loadOrders(): void {
  //   this.orderService.getOrders().subscribe({
  //     next: (data) => (this.orders = data),
  //     error: (err) => console.error('Error loading orders', err),
  //   });
  // }

  // deleteOrder(id: number): void {
  //   this.orderService.deleteOrder(id).subscribe(() => {
  //     this.orders = this.orders.filter((o) => o.id !== id);
  //   });
  // }

  // approveOrder(id: number): void {
  //   this.orderService.approveOrder(id).subscribe(() => {
  //     alert('✅ Order approved');
  //     this.loadOrders();
  //   });
  // }

  // getTotalItems(order: Order): number {
  //   if (!order.items) return 0;
  //   return order.items.reduce((total, item) => total + (item.quantity || 0), 0);
  // }

  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getOrders().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error('Error loading orders', err),
    });
  }

  deleteOrder(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to cancel this order!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(id).subscribe(() => {
          this.orders = this.orders.filter((o) => o.id !== id);
          Swal.fire('Canceled!', 'The order has been canceled.', 'success');
        });
      }
    });
  }

  approveOrder(id: number): void {
    Swal.fire({
      title: 'Approve this order?',
      text: 'Once approved, it cannot be changed!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.approveOrder(id).subscribe(() => {
          Swal.fire('✅ Approved!', 'Order approved successfully.', 'success');
          this.loadOrders();
        });
      }
    });
  }

  getTotalItems(order: Order): number {
    if (!order.items) return 0;
    return order.items.reduce((total, item) => total + (item.quantity || 0), 0);
  }
}
