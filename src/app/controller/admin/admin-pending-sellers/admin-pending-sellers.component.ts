import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-pending-sellers',
  templateUrl: './admin-pending-sellers.component.html',
  styleUrls: ['./admin-pending-sellers.component.css']
})
export class AdminPendingSellersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

pendingSellers = [
  {
    id: 1,
    fullName: 'Imtiaz Uddin',
    email: 'imtiaz@example.com',
    phone: '01712345678',
    shopName: 'Imtiaz Electronics'
  },
  // more sellers
];

approveSeller(id: number) {
  // Call backend to approve seller
  alert('Seller approved with ID: ' + id);
}

rejectSeller(id: number) {
  // Call backend to reject seller
  alert('Seller rejected with ID: ' + id);
}


}
