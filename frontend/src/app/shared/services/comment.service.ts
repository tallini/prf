import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  get(clubId: string, eventId: string) {
    return this.http.get<[Comment]>(
      `http://localhost:5000/comment/get?clubId=${clubId}&eventId=${eventId}`,
      {
        withCredentials: true,
      }
    );
  }

  create(comment: Comment, clubId: string, eventId: string) {
    const body = new URLSearchParams();
    body.set('writer', comment.writer);
    body.set('rate', comment.rate);
    body.set('text', comment.text);
    body.set('clubId', clubId);
    body.set('eventId', eventId);

    return this.http.post('http://localhost:5000/comment/create', body, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  update(comment: Comment) {
    const body = new URLSearchParams();
    body.set('writer', comment.writer);
    body.set('rate', comment.rate);
    body.set('text', comment.text);
    body.set('commentId', comment._id);

    return this.http.put('http://localhost:5000/comment/update', body, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  delete(id: string) {
    const body = new URLSearchParams();
    body.set('commentId', id);

    return this.http.delete('http://localhost:5000/comment/delete', {
      headers: this.headers,
      withCredentials: true,
      body: body,
    });
  }
}
