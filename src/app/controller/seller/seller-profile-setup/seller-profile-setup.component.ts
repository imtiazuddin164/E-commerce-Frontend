import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-profile-setup',
  templateUrl: './seller-profile-setup.component.html',
  styleUrls: ['./seller-profile-setup.component.css']
})
export class SellerProfileSetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

submitProfile(data: any) {
  // Submit seller profile details to backend
  console.log('Seller Profile Setup Data:', data);
  alert('Profile setup completed successfully!');
}


}
