import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { SubcategoryService } from 'src/app/service/subcategory.service';
import { Category } from 'src/app/model/Category.model';
import { Subcategory } from 'src/app/model/Subcategory.model';
import Swal from 'sweetalert2';
import { Product } from 'src/app/model/Product.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  newProduct: Product = {
    productCode: '',
    productName: '',
    description: '',
    categoryId: 0,
    categoryName: '',
    subcategoryId: 0,
    subcategoryName: '',
    sellerId: 0,
    price: 0,
    stock: 0,
    mainImage: '',
  };

  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  filteredSubcategories: Subcategory[] = [];

  selectedFile: File | null = null;
  imgURL: any;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadSubcategories();
  }

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

  onCategoryChange() {
    this.filteredSubcategories = this.subcategories.filter(
      (sub) => sub.categoryId == this.newProduct.categoryId
    );
    this.newProduct.subcategoryId = undefined;
  }

  onFileChanged(event: any): void {
    const file = event.target.files[0];
    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imgURL = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(form: any): void {
    if (form.valid) {
      const formData = new FormData();
      formData.append(
        'product',
        new Blob([JSON.stringify(this.newProduct)], {
          type: 'application/json',
        })
      );

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.http
        .post('http://localhost:8080/saveProductWithImage', formData)
        .subscribe({
          next: () => {
            Swal.fire('Success', 'Product added successfully!', 'success');
            this.router.navigate(['/product-list']);
          },
          error: (err) => {
            Swal.fire('Error', 'Failed to add product', 'error');
            console.error(err);
          },
        });
    }
  }
}
