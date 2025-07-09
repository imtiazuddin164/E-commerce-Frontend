// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-seller-registration',
//   templateUrl: './seller-registration.component.html',
//   styleUrls: ['./seller-registration.component.css']
// })
// export class SellerRegistrationComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


// seller-registration.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-seller-registration',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.css']
})
export class SellerRegistrationComponent {

  registerSeller(formValue: any) {
  if (formValue.password !== formValue.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  // Send to backend or show preview
  console.log('Seller registration form submitted:', formValue);

  // Optionally: show message or redirect
  alert('Seller registration submitted for admin approval.');
}

}
