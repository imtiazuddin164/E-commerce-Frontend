import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';
  // apiUrl: string = 'http://localhost:3000/user';

  constructor(private http: HttpClient, private route: Router) {}

  registerUser(user: User) {
    this.http.post(this.apiUrl, user).toPromise();
  }

  loginUser(user: User) {
    return this.http.post<User>(this.apiUrl + '/login', user);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loginUser');
  }

  getAllUsers() {
    return this.http.get<User>(this.apiUrl);
  }
}
