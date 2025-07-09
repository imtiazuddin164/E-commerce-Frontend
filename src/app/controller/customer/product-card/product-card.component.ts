import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { CartItems } from 'src/app/model/CartItems.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error loading products:', err);
      },
    });
  }

  viewDetails(productId: number): void {
    // Navigate to product detail page (to be implemented)
  }

  addToCart(product: any): void {
    const cartItem: CartItems = {
      id: product.id,
      productId: product.id,
      userId: product.userId,
      productName: product.productName,
      productCode: product.productCode,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
      mainImage: product.mainImage,
    };

    // this.cartService.addToCart(cartItem);
    // alert(`${product.productName} added to cart!`);

    this.cartService.addToCart(cartItem);
    Swal.fire({
      icon: 'success',
      title: 'Added to Cart',
      text: `"${product.productName}" has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  }

  // order proccessing

  // products: any[] = [];

  //   constructor(
  //     private productService: ProductService,
  //     private cartService: CartService,
  //     private userService: UserService,
  //     private router: Router
  //   ) {}

  //   ngOnInit(): void {
  //     this.loadProducts();
  //   }

  //   loadProducts(): void {
  //     this.productService.getAllProducts().subscribe({
  //       next: (data) => {
  //         this.products = data;
  //       },
  //       error: (err) => {
  //         console.error('Error loading products:', err);
  //       }
  //     });
  //   }

  //   addToCart(product: any): void {
  //     if (!this.userService.isLoggedIn()) {
  //       alert('Please login to add products to cart.');
  //       this.router.navigate(['/login']);
  //       return;
  //     }

  //     const cartItem: CartItems = {
  //       id: product.id,
  //       productId: product.id,
  //       userId: this.getUserId(), // added userId logic
  //       name: product.name,
  //       productCode: product.productCode,
  //       price: product.price,
  //       quantity: 1,
  //       totalPrice: product.price,
  //       mainImage: product.mainImage
  //     };

  //     this.cartService.addToCart(cartItem);
  //     alert(${product.productName} added to cart!);
  //   }

  //   buyNow(product: any): void {
  //     if (!this.userService.isLoggedIn()) {
  //       alert('Please login to continue with purchase.');
  //       this.router.navigate(['/login']);
  //       return;
  //     }

  //     // Navigate to payment page with product info (you need to build payment page)
  //     this.router.navigate(['/payment'], { queryParams: { productId: product.id } });
  //   }

  //   getUserId(): number {
  //     const userData = localStorage.getItem("loginUser");
  //     if (userData) {
  //       const user = JSON.parse(userData);
  //       return user.id;
  //     }
  //     return 0;
  //   }
}
