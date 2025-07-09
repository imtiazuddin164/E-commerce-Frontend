import { Routes } from '@angular/router';
import { LoginComponent } from './controller/login/login.component';
import { RegisterComponent } from './controller/registration/registration.component';
import { SellerRegistrationComponent } from './controller/seller/seller-registration/seller-registration.component';
import { SellerProfileSetupComponent } from './controller/seller/seller-profile-setup/seller-profile-setup.component';
import { SellerDashboardComponent } from './controller/seller/seller-dashboard/seller-dashboard.component';
import { AdminPanelComponent } from './controller/admin/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './controller/admin/admin-dashboard/admin-dashboard.component';
import { AdminPendingSellersComponent } from './controller/admin/admin-pending-sellers/admin-pending-sellers.component';
import { MainLayoutComponent } from './controller/main-layout/main-layout.component';
import { BlankLayoutComponent } from './controller/blank-layout/blank-layout.component';
import { HeaderComponent } from './controller/header/header.component';
import { FooterComponent } from './controller/footer/footer.component';
import { AdminCouponComponent } from './controller/admin/admin-coupon/admin-coupon.component';
import { AdminReportsComponent } from './controller/admin/admin-reports/admin-reports.component';
import { OrderManagementComponent } from './controller/admin/order-management/order-management.component';
import { ProductCardComponent } from './controller/customer/product-card/product-card.component';
import { CartPageComponent } from './controller/customer/cart-page/cart-page.component';
import { ProductDetailsComponent } from './controller/customer/product-details/product-details.component';
import { PaymentComponent } from './controller/customer/payment/payment.component';
import { InvoiceComponent } from './controller/customer/invoice/invoice.component';
import { DeliveryInformationComponent } from './controller/customer/delivery-information/delivery-information.component';
import { HomeComponent } from './controller/customer/home/home.component';
import { ProductListComponent } from './controller/admin/product-list/product-list.component';
import { AddProductComponent } from './controller/admin/add-product/add-product.component';
import { EditProductComponent } from './controller/admin/edit-product/edit-product.component';
import { CategoryComponent } from './controller/admin/category/category.component';
import { SubcategoryComponent } from './controller/admin/subcategory/subcategory.component';
import { DailySalesComponent } from './controller/admin/daily-sales/daily-sales.component';
import { MonthlySalesComponent } from './controller/admin/monthly-sales/monthly-sales.component';
import { YearlySalesComponent } from './controller/admin/yearly-sales/yearly-sales.component';
import { TopSellingProductsComponent } from './controller/admin/top-selling-products/top-selling-products.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'product-card', component: ProductCardComponent },
      { path: 'cart-page', component: CartPageComponent },
      // { path: 'productDetails', component: ProductDetailsComponent },
      { path: 'product/:id', component: ProductDetailsComponent },
      { path: 'payment', component: PaymentComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'delivery-information', component: DeliveryInformationComponent },
    ],
  },

  {
    path: 'admin',
    component: AdminPanelComponent,
    children: [
      { path: '', redirectTo: 'admin-dashboard', pathMatch: 'full' },
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'order-management', component: OrderManagementComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'pending-sellers', component: AdminPendingSellersComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'subcategory', component: SubcategoryComponent },
      { path: 'coupon', component: AdminCouponComponent },
      { path: 'admin-reports', component: AdminReportsComponent },
      { path: 'daily-sales', component: DailySalesComponent },
      { path: 'monthly-sales', component: MonthlySalesComponent },
      { path: 'yearly-sales', component: YearlySalesComponent },
      { path: 'top-products', component: TopSellingProductsComponent },
    ],
  },

  {
    path: 'seller-dashboard',
    component: SellerDashboardComponent,
    children: [
      { path: '', redirectTo: 'seller/profile-setup', pathMatch: 'full' },
      // { path: 'seller-deshboard', component: SellerDashboardComponent},
      { path: 'seller/profile-setup', component: SellerProfileSetupComponent },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegisterComponent },
      { path: 'seller-registration', component: SellerRegistrationComponent },
    ],
  },

  // { path: 'home', component: HomeComponent},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'admin-panel', component: AdminPanelComponent},
  // { path: 'admin-dashboard', component: AdminDashboardComponent,},
  // { path: 'product-management', component: ProductListComponent,},
  // { path: 'add-product', component: AddProductComponent,},
  // { path: 'product-list', component: ProductListComponent,},
  // { path: 'product-card', component: ProductCardComponent,},
  // { path: 'cart-page', component: CartPageComponent,},
  // { path: 'edit-product/:id', component: EditProductComponent,},
  // { path: 'login', component: LoginComponent,},
  // { path: 'registration', component: RegisterComponent,},
  // { path: 'category', component: CategoryComponent,},
  // { path: 'subcategory', component: SubcategoryComponent,},
  // { path: 'electronics', component: ElectronicsComponent,},
  // { path: 'productDetails', component: ProductDetailsComponent,},
  // { path: 'shippingInformation', component: ShippingInformationComponent,},
  // { path: 'payment-method', component: PaymentMethodComponent,},
  // { path: 'invoice', component: InvoiceComponent,},
  // { path: 'header', component: HeaderComponent,},
  // { path: 'footer', component: FooterComponent,},
  // { path: 'delivery-information', component: DeliveryInformationComponent,},
  // { path: 'payment', component: PaymentComponent,},
  // { path: 'seller-registration', component: SellerRegistrationComponent},
  // { path: 'admin/pending-sellers', component: AdminPendingSellersComponent },
  // { path: 'seller/profile-setup', component: SellerProfileSetupComponent },
  // { path: 'seller-dashboard', component: SellerDashboardComponent },
];
export default appRoutes;
