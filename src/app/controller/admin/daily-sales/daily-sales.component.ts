import { Component, OnInit } from '@angular/core';
import { SalesItemDetail, SalesReportsService } from 'src/app/service/sales-reports.service';

@Component({
  selector: 'app-daily-sales',
  templateUrl: './daily-sales.component.html',
  styleUrls: ['./daily-sales.component.css']
})
export class DailySalesComponent implements OnInit {
  todaySales: number = 0;
  detailedTodayList: SalesItemDetail[] = [];
  filteredList: SalesItemDetail[] = [];
  search: string = '';

  constructor(private salesService: SalesReportsService) {}

  ngOnInit(): void {
    this.salesService.getSalesReportData().subscribe(({ orders }) => {
      const items = this.salesService.extractItems(orders);
      this.todaySales = this.salesService.calculateSales(items, 'day');
      this.detailedTodayList = this.salesService.groupDetailedSales(items, 'day');
      this.filteredList = this.detailedTodayList; // Initial copy
    });
  }

  filterSales() {
    const searchTerm = this.search.toLowerCase();
    this.filteredList = this.detailedTodayList.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.date.toLowerCase().includes(searchTerm)
    );
  }
}
