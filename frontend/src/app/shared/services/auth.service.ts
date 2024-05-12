import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private currentUser!: User;

  setCurrentUser(user: any) {
    this.currentUser = user as User;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  isAdmin(): boolean {
    return this.currentUser?.role === 'ADMIN';
  }

  // login
  login(username: string, password: string) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const value = this.http.post('http://localhost:5000/user/login', body, {
      headers: headers,
      withCredentials: true,
    });
    console.log('ez a value: ', value);

    return value;
  }

  register(user: User) {
    // HTTP POST request
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('username', user.username);
    body.set('firstName', user.firstName);
    body.set('lastName', user.lastName);
    body.set('password', user.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post('http://localhost:5000/user/register', body, {
      headers: headers,
    });
  }

  logout() {
    return this.http.post(
      'http://localhost:5000/user/logout',
      {},
      { withCredentials: true, responseType: 'text' }
    );
  }

  checkAuth() {
    return this.http.get<boolean>('http://localhost:5000/user/check-auth', {
      withCredentials: true,
    });
  }
}
