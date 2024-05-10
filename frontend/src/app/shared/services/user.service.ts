import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('http://localhost:5000/user/get-all', {
      withCredentials: true,
    });
  }

  delete(id: string) {
    const body = new URLSearchParams();
    body.set('id', id);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.delete('http://localhost:5000/user/delete', {
      headers: headers,
      withCredentials: true,
      body: body,
    });
  }

  update(user: User) {
    const body = new URLSearchParams();
    body.set('username', user.username);
    body.set('lastName', user.lastName);
    body.set('firstName', user.firstName);
    body.set('email', user.email);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.put('http://localhost:5000/user/update', body, {
      headers: headers,
      withCredentials: true,
    });
  }
}
