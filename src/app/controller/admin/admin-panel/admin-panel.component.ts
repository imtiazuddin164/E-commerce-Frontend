import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/User.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  isSidebarOpen = false;
  showCategoryMenu: boolean = false;
  showProductMenu: boolean = false;
  showSellerMenu: boolean = false;
  showSalesMenu: boolean = false; // 🔹 Sales dropdown status

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleCategoryMenu() {
    this.showCategoryMenu = !this.showCategoryMenu;
  }

  toggleProductMenu() {
    this.showProductMenu = !this.showProductMenu;
  }

  toggleSellerMenu() {
    this.showSellerMenu = !this.showSellerMenu;
  }

  // 🔹 Added for Sales Reports dropdown
  toggleSalesMenu() {
    this.showSalesMenu = !this.showSalesMenu;
  }
}
