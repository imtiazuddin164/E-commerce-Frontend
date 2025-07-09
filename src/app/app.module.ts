import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './controller/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import appRoutes from './app.routes';
import { HeaderComponent } from './controller/header/header.component';
import { FooterComponent } from './controller/footer/footer.component';
import { RegisterComponent } from './controller/registration/registration.component';
import { SellerRegistrationComponent } from './controller/seller/seller-registration/seller-registration.component';
import { SellerProfileSetupComponent } from './controller/seller/seller-profile-setup/seller-profile-setup.component';
import { SellerDashboardComponent } from './controller/seller/seller-dashboard/seller-dashboard.component';
import { AdminPanelComponent } from './controller/admin/admin-panel/admin-panel.component';
import { AdminDashboardComponent } from './controller/admin/admin-dashboard/admin-dashboard.component';
import { AdminPendingSellersComponent } from './controller/admin/admin-pending-sellers/admin-pending-sellers.component';
import { MainLayoutComponent } from './controller/main-layout/main-layout.component';
import { BlankLayoutComponent } from './controller/blank-layout/blank-layout.component';
import { AdminCouponComponent } from './controller/admin/admin-coupon/admin-coupon.component';
import { AdminReportsComponent } from './controller/admin/admin-reports/admin-reports.component';
import { OrderManagementComponent } from './controller/admin/order-management/order-management.component';
import { ProductDetailsComponent } from './controller/customer/product-details/product-details.component';
import { CartPageComponent } from './controller/customer/cart-page/cart-page.component';
import { PaymentComponent } from './controller/customer/payment/payment.component';
import { ProductCardComponent } from './controller/customer/product-card/product-card.component';
import { DeliveryInformationComponent } from './controller/customer/delivery-information/delivery-information.component';
import { OrderSummaryComponent } from './controller/customer/order-summary/order-summary.component';
import { InvoiceComponent } from './controller/customer/invoice/invoice.component';
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

@NgModule({
  declarations: [
    RegisterComponent,
    AppComponent,
    HomeComponent,
    LoginComponent,
    ProductDetailsComponent,
    CartPageComponent,
    PaymentComponent,
    HeaderComponent,
    FooterComponent,
    AdminPanelComponent,
    AdminDashboardComponent,
    OrderManagementComponent,
    ProductListComponent,
    AddProductComponent,
    EditProductComponent,
    CategoryComponent,
    SubcategoryComponent,
    ProductCardComponent,
    DeliveryInformationComponent,
    OrderSummaryComponent,
    PaymentComponent,
    SellerRegistrationComponent,
    AdminPendingSellersComponent,
    SellerProfileSetupComponent,
    SellerDashboardComponent,
    SellerDashboardComponent,
    MainLayoutComponent,
    BlankLayoutComponent,
    InvoiceComponent,
    AdminCouponComponent,
    AdminReportsComponent,
    DailySalesComponent,
    MonthlySalesComponent,
    YearlySalesComponent,
    TopSellingProductsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
