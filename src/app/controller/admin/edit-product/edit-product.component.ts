import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { CategoryService } from 'src/app/service/category.service';
import { SubcategoryService } from 'src/app/service/subcategory.service';
import { Product } from 'src/app/model/Product.model';
import { Category } from 'src/app/model/Category.model';
import { Subcategory } from 'src/app/model/Subcategory.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
//   productId: string = '';
//   product: Product = {
//     productCode: '',
//     productName: '',
//     description: '',
//     categoryId: 0,
//     categoryName: '',
//     subcategoryName: '',
//     subcategoryId: 0,
//     sellerId: 0,
//     price: 0,
//     stock: 0,
//     mainImage: '',
//   };

//   categories: Category[] = [];
//   subcategories: Subcategory[] = [];
//   filteredSubcategories: Subcategory[] = [];

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private productService: ProductService,
//     private categoryService: CategoryService,
//     private subcategoryService: SubcategoryService
//   ) {}

//   ngOnInit(): void {
//     this.productId = this.route.snapshot.paramMap.get('id') || '';
//     this.loadCategories();
//     this.loadSubcategories();
//     this.getProductData();
//   }

//   loadCategories() {
//     this.categoryService.getCategories().subscribe((data) => {
//       this.categories = data;
//     });
//   }

//   loadSubcategories() {
//     this.subcategoryService.getSubcategories().subscribe((data) => {
//       this.subcategories = data;
//     });
//   }

//   getProductData() {
//     this.productService.getProductById(this.productId).subscribe((data) => {
//       this.product = data;
//       this.onCategoryChange(); // Filter subcategories based on selected category
//     });
//   }

//   // onCategoryChange() {
//   //   this.filteredSubcategories = this.subcategories.filter(
//   //     (sub) => sub.categoryId === this.product.categoryId
//   //   );
//   //   this.product.subcategoryId = undefined;
//   // }


// onCategoryChange() {
//   this.filteredSubcategories = this.subcategories.filter(
//     (sub) => sub.categoryId == this.product.categoryId
//   );

//   const isSubcategoryValid = this.filteredSubcategories.some(
//     (sub) => sub.id == this.product.subcategoryId
//   );

//   if (!isSubcategoryValid) {
//     this.product.subcategoryId = undefined;
//   }
// }

//   onSubmit(form: any): void {
//     if (form.valid) {
//       this.productService
//         .updateProduct(this.productId, this.product)
//         .subscribe({
//           next: () => {
//             Swal.fire({
//               title: 'Success!',
//               text: 'Product updated successfully!',
//               icon: 'success',
//               confirmButtonText: 'OK',
//             }).then(() => {
//               this.router.navigate(['/product-list']);
//             });
//           },
//           error: (err) => {
//             Swal.fire({
//               title: 'Error!',
//               text: 'Something went wrong while adding the product.',
//               icon: 'error',
//               confirmButtonText: 'OK',
//             });
//             console.error(err);
//           },
//         });
//     }
//   }

//  productId: string = '';
//   product: Product = {
//     productCode: '',
//     productName: '',
//     description: '',
//     categoryId: 0,
//     categoryName: '',
//     subcategoryName: '',
//     subcategoryId: 0,
//     sellerId: 0,
//     price: 0,
//     stock: 0,
//     mainImage: '',
//   };

//   categories: Category[] = [];
//   subcategories: Subcategory[] = [];
//   filteredSubcategories: Subcategory[] = [];

//   selectedImage: File | null = null;

//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private productService: ProductService,
//     private categoryService: CategoryService,
//     private subcategoryService: SubcategoryService
//   ) {}

//   ngOnInit(): void {
//     this.productId = this.route.snapshot.paramMap.get('id') || '';
//     this.loadCategories();
//     this.loadSubcategories();
//     this.getProductData();
//   }

//   loadCategories() {
//     this.categoryService.getCategories().subscribe((data) => {
//       this.categories = data;
//     });
//   }

//   loadSubcategories() {
//     this.subcategoryService.getSubcategories().subscribe((data) => {
//       this.subcategories = data;
//     });
//   }

//   getProductData() {
//     this.productService.getProductById(this.productId).subscribe((data) => {
//       this.product = data;
//       this.onCategoryChange(); // Filter subcategories
//     });
//   }

//   onCategoryChange() {
//     this.filteredSubcategories = this.subcategories.filter(
//       (sub) => sub.categoryId === this.product.categoryId
//     );

//     const isSubcategoryValid = this.filteredSubcategories.some(
//       (sub) => sub.id === this.product.subcategoryId
//     );

//     if (!isSubcategoryValid) {
//       this.product.subcategoryId = undefined;
//     }
//   }

//   onImageSelected(event: any): void {
//     const file: File = event.target.files[0];
//     if (file) {
//       this.selectedImage = file;
//     }
//   }

//   onSubmit(form: any): void {
//     if (form.valid) {
//       const formData = new FormData();
//       formData.append('productId', this.productId);
//       formData.append('productCode', this.product.productCode || '');
//       formData.append('productName', this.product.productName || '');
//       formData.append('description', this.product.description || '');
//       formData.append('categoryId', String(this.product.categoryId));
//       formData.append('subcategoryId', String(this.product.subcategoryId));
//       formData.append('price', String(this.product.price));
//       formData.append('stock', String(this.product.stock));

//       if (this.selectedImage) {
//         formData.append('image', this.selectedImage);
//       }

//       this.productService.updateProductWithImage(formData).subscribe({
//         next: () => {
//           Swal.fire({
//             title: 'Success!',
//             text: 'Product updated successfully!',
//             icon: 'success',
//             confirmButtonText: 'OK',
//           }).then(() => {
//             this.router.navigate(['/product-list']);
//           });
//         },
//         error: (err) => {
//           Swal.fire({
//             title: 'Error!',
//             text: 'Something went wrong while updating the product.',
//             icon: 'error',
//             confirmButtonText: 'OK',
//           });
//           console.error(err);
//         },
//       });
//     }
//   }

  productId: string = '';
  product: Product = {
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
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService
  ) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    this.loadCategories();
    this.loadSubcategories();
    this.getProductData();
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

  getProductData() {
    this.productService.getProductById(this.productId).subscribe((data) => {
      this.product = data;
      this.imgURL = data.mainImage; // Show current image
      this.onCategoryChange(); // Filter subcategories
    });
  }

  onCategoryChange() {
    this.filteredSubcategories = this.subcategories.filter(
      (sub) => sub.categoryId == this.product.categoryId
    );

    const isSubcategoryValid = this.filteredSubcategories.some(
      (sub) => sub.id == this.product.subcategoryId
    );

    if (!isSubcategoryValid) {
      this.product.subcategoryId = undefined;
    }
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

      // Product JSON
      formData.append(
        'product',
        new Blob([JSON.stringify(this.product)], {
          type: 'application/json',
        })
      );

      // If new image selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.productService.updateProductWithImage(formData).subscribe({
        next: () => {
          Swal.fire('Success!', 'Product updated successfully!', 'success').then(() => {
            this.router.navigate(['/product-list']);
          });
        },
        error: (err) => {
          Swal.fire('Error!', 'Failed to update product.', 'error');
          console.error(err);
        },
      });
    }
  }
}
