import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>('http://localhost:5000/app/get-all-users', {
      withCredentials: true,
    });
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/delete-user?id=' + id, {
      withCredentials: true,
    });
  }
}
