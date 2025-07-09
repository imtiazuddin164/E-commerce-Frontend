import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

 


    summary: any;
  salesChartData: any[] = [];
  salesChartLabels: string[] = [];
  orderStatusLabels: string[] = [];
  orderStatusData: number[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadSummary();
    this.loadSalesChart();
    this.loadOrderStatus();
  }

  loadSummary() {
    this.http.get('/api/admin/reports/summary').subscribe(data => this.summary = data);
  }

  loadSalesChart() {
    this.http.get<any[]>('/api/admin/reports/sales-by-month').subscribe(data => {
      this.salesChartLabels = data.map(item => item.month);
      this.salesChartData = [{ data: data.map(item => item.totalSales), label: 'Sales' }];
    });
  }

  loadOrderStatus() {
    this.http.get<any[]>('/api/admin/reports/order-status').subscribe(data => {
      this.orderStatusLabels = data.map(item => item.status);
      this.orderStatusData = data.map(item => item.count);
    });
  }
}
