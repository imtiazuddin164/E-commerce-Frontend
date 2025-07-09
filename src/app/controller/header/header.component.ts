import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/Category.model';
import { Subcategory } from 'src/app/model/Subcategory.model';
import { CartService } from 'src/app/service/cart.service';
import { CategoryService } from 'src/app/service/category.service';
import { SubcategoryService } from 'src/app/service/subcategory.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  cartCount: number = 0;
  // previousScroll = 0;

  hoverCategoryId: number | undefined = undefined;

  constructor(
    private categoryService: CategoryService,
    private subcategoryService: SubcategoryService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
        // this.initScrollListener();
    });

    this.subcategoryService.getSubcategories().subscribe((data) => {
      this.subcategories = data;
    });

    this.cartService.getCartItemCountObservable().subscribe((count) => {
      this.cartCount = count;
    });
  }

  goToSubcategory(subcategoryId: number | undefined) {
    this.router.navigate(['/products-by-subcategory', subcategoryId]);
  }

  getSubcategoriesByCategory(categoryId: number | undefined) {
    return this.subcategories.filter((sub) => sub.categoryId === categoryId);
  }

//   initScrollListener() {
//   window.addEventListener('scroll', () => {
//     const currentScroll = window.scrollY;
//     const secondaryNav = document.getElementById('secondaryNav');

//     if (secondaryNav) {
//       if (currentScroll > this.previousScroll) {
//         // নিচে scroll করলে hide
//         secondaryNav.style.top = '-100px';
//         secondaryNav.style.transition = 'top 0.3s ease';
//       } else {
//         // উপরে scroll করলে show
//         secondaryNav.style.top = '69px'; // navbar height অনুযায়ী adjust করো
//       }
//     }

//     this.previousScroll = currentScroll;
//   });
// }
}
