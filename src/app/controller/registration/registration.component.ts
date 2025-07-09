import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { User } from 'src/app/model/User.model';
import { UserService } from 'src/app/service/User.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegisterComponent implements OnInit {

constructor(private userService: UserService, private route: Router) {}

  ngOnInit(): void {}

  registerUser(user: User) {
    //console.log("hello")
    this.userService.registerUser(user);

    alert('Registration Successfull');
  }
}
