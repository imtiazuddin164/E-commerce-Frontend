import { Component, OnInit } from '@angular/core';
import { SalesItemDetail, SalesReportsService } from 'src/app/service/sales-reports.service';

@Component({
  selector: 'app-yearly-sales',
  templateUrl: './yearly-sales.component.html',
  styleUrls: ['./yearly-sales.component.css']
})
export class YearlySalesComponent implements OnInit {


  yearlySales: number = 0;
  detailedYearlyList: SalesItemDetail[] = [];
  search: string = '';
  filteredList: SalesItemDetail[] = [];

  constructor(private salesService: SalesReportsService) {}

  ngOnInit(): void {
    this.salesService.getSalesReportData().subscribe(({ orders }) => {
      const items = this.salesService.extractItems(orders);
      this.yearlySales = this.salesService.calculateSales(items, 'year');
      this.detailedYearlyList = this.salesService.groupDetailedSales(items, 'year');
      this.filteredList = this.detailedYearlyList;
    });
  }

  filterSales() {
    const searchTerm = this.search.toLowerCase();
    this.filteredList = this.detailedYearlyList.filter(item =>
      item.name.toLowerCase().includes(searchTerm) || item.date.toLowerCase().includes(searchTerm)
    );
  }

}
