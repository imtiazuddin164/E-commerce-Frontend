// import { Component, OnInit } from '@angular/core';
// import { Order, OrderItem } from 'src/app/model/Order.model';
// import { Product } from 'src/app/model/Product.model';
// import { DashboardService } from 'src/app/service/dashboard.service';

// @Component({
//   selector: 'app-admin-dashboard',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css'],
// })
// export class AdminDashboardComponent implements OnInit {
//   totalMedicines: number = 0;
//   stockAlerts: number = 0;
//   monthlySales: number = 0;
//   newOrders: number = 0;
//   recentOrders: any[] = [];

//   constructor(private dashboardService: DashboardService) {}

//   ngOnInit(): void {
//     this.dashboardService
//       .getDashboardData()
//       .subscribe(({ products, orders }) => {
//         this.totalMedicines = products.length;

//         this.stockAlerts = products.filter(
//           (p: Product) => (p.stock ?? 0) < 10 || (p.stock ?? 0) < 10
//         ).length;
//         const currentMonth = new Date().getMonth();
//         this.monthlySales = orders
//           .filter(
//             (order: Order) => new Date(order.date!).getMonth() === currentMonth
//           )
//           .flatMap((order: Order) => order.items || [])
//           .reduce(
//             (sum: number, item: OrderItem) => sum + (item.quantity ?? 0),
//             0
//           );

//         this.newOrders = orders.filter(
//           (order: Order) => new Date(order.date!).getMonth() === currentMonth
//         ).length;
//         const recentItems = orders
//           .flatMap((order: Order) =>
//             (order.items || []).map((item) => ({
//               id: order.id,
//               medicine: item.name ?? 'Unknown',
//               quantity: item.quantity ?? 0,
//               date: order.date,
//             }))
//           )
//           .sort(
//             (
//               a: { date: string | number | Date },
//               b: { date: string | number | Date }
//             ) => new Date(b.date).getTime() - new Date(a.date).getTime()
//           )
//           .slice(0, 5);

//         this.recentOrders = recentItems;
//       });
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from 'src/app/model/Order.model';
import { Product } from 'src/app/model/Product.model';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  totalMedicines: number = 0;
  stockAlerts: number = 0;

  dailySales: number = 0;    // new
  monthlySales: number = 0;
  yearlySales: number = 0;   // new

  newOrders: number = 0;
  recentOrders: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService
      .getDashboardData()
      .subscribe(({ products, orders }) => {
        this.totalMedicines = products.length;

        this.stockAlerts = products.filter(
          (p: Product) => (p.stock ?? 0) < 10
        ).length;

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const todayStr = now.toISOString().split('T')[0];

        // dailySales calculation
        this.dailySales = orders
          .filter(
            (order: Order) =>
              order.date &&
              order.date.toString().startsWith(todayStr)
          )
          .flatMap((order: Order) => order.items || [])
          .reduce(
            (sum: number, item: OrderItem) =>
              sum + ((item.quantity ?? 0) * (item.price ?? 0)),
            0
          );

        // monthlySales calculation
        this.monthlySales = orders
          .filter(
            (order: Order) =>
              order.date &&
              new Date(order.date).getMonth() === currentMonth &&
              new Date(order.date).getFullYear() === currentYear
          )
          .flatMap((order: Order) => order.items || [])
          .reduce(
            (sum: number, item: OrderItem) =>
              sum + ((item.quantity ?? 0) * (item.price ?? 0)),
            0
          );

        // yearlySales calculation
        this.yearlySales = orders
          .filter(
            (order: Order) =>
              order.date &&
              new Date(order.date).getFullYear() === currentYear
          )
          .flatMap((order: Order) => order.items || [])
          .reduce(
            (sum: number, item: OrderItem) =>
              sum + ((item.quantity ?? 0) * (item.price ?? 0)),
            0
          );

        // newOrders for current month
        this.newOrders = orders.filter(
          (order: Order) =>
            order.date &&
            new Date(order.date).getMonth() === currentMonth &&
            new Date(order.date).getFullYear() === currentYear
        ).length;

        // recentOrders - show last 5 items sorted by date desc
        const recentItems = orders
          .flatMap((order: Order) =>
            (order.items || []).map((item) => ({
              id: order.id,
              medicine: item.name ?? 'Unknown',
              quantity: item.quantity ?? 0,
              date: order.date,
            }))
          )
          .sort(
            (
              a: { date: string | number | Date },
              b: { date: string | number | Date }
            ) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 5);

        this.recentOrders = recentItems;
      });
  }
}
