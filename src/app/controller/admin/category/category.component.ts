import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/Category.model';
import { CategoryService } from 'src/app/service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  newCategory: Category = { categoryName: '' };
  isEditing = false;
  editCategoryId: number | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  // onSubmit(form: any) {
  //   if (this.isEditing && this.editCategoryId !== null) {
  //     this.categoryService
  //       .updateCategory(this.editCategoryId, this.newCategory)
  //       .subscribe(() => {
  //         this.resetForm(form);
  //         this.getCategories();
  //       });
  //   } else {
  //     this.categoryService.addCategory(this.newCategory).subscribe(() => {
  //       this.resetForm(form);
  //       this.getCategories();
  //     });
  //   }
  // }

onSubmit(form: any) {
  if (this.isEditing && this.editCategoryId !== null) {
    this.categoryService
      .updateCategory(this.editCategoryId, this.newCategory)
      .subscribe(() => {
        this.resetForm(form);
        this.getCategories();
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'Category updated successfully.',
          timer: 1500,
          showConfirmButton: false,
        });
      });
  } else {
    this.categoryService.addCategory(this.newCategory).subscribe(() => {
      this.resetForm(form);
      this.getCategories();
      Swal.fire({
        icon: 'success',
        title: 'Added!',
        text: 'Category added successfully.',
        timer: 1500,
        showConfirmButton: false,
      });
    });
  }
}


  editCategory(category: Category) {
    this.newCategory = { ...category };
    this.isEditing = true;
    // this.editCategoryId = category.id;
    this.editCategoryId = category.id ?? null;
  }

  // deleteCategory(id: number) {
  //   this.categoryService.deleteCategory(id).subscribe(() => {
  //     this.getCategories();
  //   });
  // }

  deleteCategory(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this category!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.deleteCategory(id).subscribe(() => {
          this.getCategories();
          Swal.fire('Deleted!', 'Category has been deleted.', 'success');
        });
      }
    });
  }

  resetForm(form: any) {
    form.resetForm();
    this.newCategory = { categoryName: '' };
    this.isEditing = false;
    this.editCategoryId = null;
  }
}
