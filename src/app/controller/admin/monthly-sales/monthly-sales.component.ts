import { Component, OnInit } from '@angular/core';
import { SalesItemDetail, SalesReportsService } from 'src/app/service/sales-reports.service';

@Component({
  selector: 'app-monthly-sales',
  templateUrl: './monthly-sales.component.html',
  styleUrls: ['./monthly-sales.component.css']
})
export class MonthlySalesComponent implements OnInit {

monthlySales: number = 0;
  detailedMonthlyList: SalesItemDetail[] = [];
  search: string = '';
  filteredList: SalesItemDetail[] = [];

  constructor(private salesService: SalesReportsService) {}

  ngOnInit(): void {
    this.salesService.getSalesReportData().subscribe(({ orders }) => {
      const items = this.salesService.extractItems(orders);
      this.monthlySales = this.salesService.calculateSales(items, 'month');
      this.detailedMonthlyList = this.salesService.groupDetailedSales(items, 'month');
      this.filteredList = this.detailedMonthlyList;
    });
  }

  filterSales() {
    const search = this.search.toLowerCase();
    this.filteredList = this.detailedMonthlyList.filter(item =>
      item.name.toLowerCase().includes(search) || item.date.toLowerCase().includes(search)
    );
  }

}
