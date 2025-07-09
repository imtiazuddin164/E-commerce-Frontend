import { Component, OnInit } from '@angular/core';
import { SalesReportsService } from 'src/app/service/sales-reports.service';

@Component({
  selector: 'app-top-selling-products',
  templateUrl: './top-selling-products.component.html',
  styleUrls: ['./top-selling-products.component.css']
})
export class TopSellingProductsComponent implements OnInit {
topSelling: { name: string; quantitySold: number }[] = [];

  constructor(private salesService: SalesReportsService) {}

  ngOnInit(): void {
    this.salesService.getSalesReportData().subscribe(({ orders }) => {
      const items = this.salesService.extractItems(orders);

      const salesMap = new Map<string, number>();
      items.forEach(item => {
        const name = item.name ?? 'Unknown';
        const qty = item.quantity ?? 0;
        salesMap.set(name, (salesMap.get(name) || 0) + qty);
      });

      this.topSelling = Array.from(salesMap.entries())
        .map(([name, quantitySold]) => ({ name, quantitySold }))
        .sort((a, b) => b.quantitySold - a.quantitySold)
        .slice(0, 5);
    });
  }
}
