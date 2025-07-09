import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category.model';
import { Subcategory } from 'src/app/model/Subcategory.model';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { SubcategoryService } from 'src/app/service/subcategory.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];

  // constructor(private http: HttpClient, private router: Router) {}
  constructor(
    private productService: CategoryService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();
    this.getProducts();
  }

  // loadCategories() {
  //   this.http
  //     .get<Category[]>('http://localhost:3000/categories')
  //     .subscribe((data) => {
  //       this.categories = data;
  //     });
  // }

  // loadSubcategories() {
  //   this.http
  //     .get<Subcategory[]>('http://localhost:3000/subcategories')
  //     .subscribe((data) => {
  //       this.subcategories = data;
  //       // console.log(data);
  //     });
  // }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  loadSubcategories() {
    this.subcategoryService.getSubcategories().subscribe((data) => {
      this.subcategories = data;
    });
  }

  getProducts(): void {
    // this.http.get<any[]>('http://localhost:3000/products').subscribe({
    this.http.get<any[]>('http://localhost:8080/product').subscribe({
      next: (data) => {
        // Add category/subcategory name from their IDs
        this.products = data.map((product) => {
          const category = this.categories.find((c) => {
            return c.id == product.categoryId;
          });
          const subcategory = this.subcategories.find(
            (sc) => sc.id == product.subcategoryId
          );

          return {
            ...product,
            categoryName: category?.categoryName || 'N/A',
            subcategoryName: subcategory?.subcategoryName || 'N/A',
          };
        });
      },
      error: (error) => {
        console.error('Failed to fetch products:', error);
      },
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['admin/edit-product', id]);
  }

  // #First Method

  // deleteProduct(id: number): void {
  //   if (confirm('Are you sure you want to delete this product?')) {
  //     this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
  //       next: () => {
  //         this.products = this.products.filter((product) => product.id !== id);
  //       },
  //       error: (error) => {
  //         console.error('Failed to delete product:', error);
  //       },
  //     });
  //   }
  // }

  // #Second Method

  // deleteProduct(id: number): void {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: 'You will not be able to recover this product!',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       this.http.delete(`http://localhost:3000/products/${id}`).subscribe({
  //         next: () => {
  //           this.products = this.products.filter(
  //             (product) => product.id !== id
  //           );
  //         },
  //         error: (error) => {
  //           console.error('Failed to delete product:', error);
  //         },
  //       });
  //       Swal.fire('Deleted!', 'Product has been deleted.', 'success');
  //     }
  //   });
  // }

  // #Third Method

  deleteProduct(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          // .delete(`http://localhost:3000/products/${id}`)
          .delete(`http://localhost:8080/product/${id}`)
          .subscribe(() => {
            this.products = this.products.filter(
              (product) => product.id !== id
            );
            Swal.fire('Deleted!', 'Product has been deleted.', 'success');
          });
      }
    });
  }
}
