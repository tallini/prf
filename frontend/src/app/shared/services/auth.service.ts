import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // login
  login(userName: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', userName);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('http://localhost:5000/app/login', body, {
      headers: headers,
      withCredentials: true,
    });
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('userName', user.userName);
    body.set('firstName', user.firstName);
    body.set('lastName', user.lastName);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('http://localhost:5000/app/register', body, {
      headers: headers,
    });
  }

  logout() {
    return this.http.post(
      'http://localhost:5000/app/logout',
      {},
      { withCredentials: true, responseType: 'text' }
    );
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/app/checkAuth', {
      withCredentials: true,
    });
  }
}
