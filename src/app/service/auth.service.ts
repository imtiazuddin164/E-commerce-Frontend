// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private baseUrl = 'http://localhost:8080/auth';

//   constructor(private http: HttpClient) {}

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, user);
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, credentials, {
//       responseType: 'text',
//     });
//   }

//   logout(): Observable<any> {
//     return this.http.post(`${this.baseUrl}/logout`, {});
//   }
// }


// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

  
//   private baseUrl = 'http://localhost:8080/auth';

//   constructor(private http: HttpClient) { }

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/register`, user);
//   }

//   login(credentials: any): Observable<any> {
//     return this.http.post(`${this.baseUrl}/login`, credentials, { responseType: 'text' });
//   }

//   logout(): Observable<any> {
//     return this.http.post(`${this.baseUrl}/logout`, {});
//   }
// }
