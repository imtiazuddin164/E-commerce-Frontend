import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { UserService } from 'src/app/service/User.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  users: any;

  constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {}

  loginUser(user: User) {
    this.userService.loginUser(user).subscribe(
      (loggedUser) => {
        localStorage.removeItem('currentuser');
        localStorage.setItem('currentuser', loggedUser.userName);
        console.log(localStorage.getItem('currentuser'));
        this.route.navigate(['/admin/admin-dashboard']);
      },
      (error) => {
        alert('Not Logged In');
      }
    );
  }
}
