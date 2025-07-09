import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  offerProducts: any;
  popularProducts: any;
  productOffers: any;
  promotions: any;

  constructor(private productService: ProductService) {}

  products: any[] = [];

  ngOnInit(): void {
    // this.productService.getProducts().subscribe((data) => {
    //   this.products = data;
    // });
  }
}
