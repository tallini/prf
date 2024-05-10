import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from '../models/Club';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  constructor(private http: HttpClient) {}

  private currentClub!: Club;
  private currentEvent!: Event;

  getCurrentClub() {
    return this.currentClub;
  }

  setCurrentClub(club: Club) {
    this.currentClub = club;
  }

  getCurrentEvent() {
    return this.currentEvent;
  }

  setCurrentEvent(event: Event) {
    this.currentEvent = event;
  }

  headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  getAll() {
    return this.http.get<Club[]>('http://localhost:5000/book-club/get-all', {
      withCredentials: true,
    });
  }

  get(id: String) {
    return this.http.get<Club>(
      `http://localhost:5000/book-club/get?clubId=${id}`,
      {
        withCredentials: true,
      }
    );
  }

  create(club: Club) {
    const body = new URLSearchParams();
    body.set('name', club.name);
    body.set('description', club.description);
    body.set('scedule', club.scedule);
    console.log(body);

    return this.http.post('http://localhost:5000/book-club/create', body, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  update(club: Club) {
    const body = new URLSearchParams();
    body.set('name', club.name);
    body.set('description', club.description);
    body.set('scedule', club.scedule);
    body.set('clubId', club._id);

    return this.http.put('http://localhost:5000/book-club/update', body, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  delete(id: string) {
    const body = new URLSearchParams();
    body.set('clubId', id);

    return this.http.delete('http://localhost:5000/book-club/delete', {
      headers: this.headers,
      withCredentials: true,
      body: body,
    });
  }

  addMember(userId: string, clubId: string) {
    const body = new URLSearchParams();
    body.set('userId', userId);
    body.set('clubId', clubId);

    return this.http.post('http://localhost:5000/book-club/add-member', body, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  deleteMember(userId: string, clubId: string) {
    const body = new URLSearchParams();
    body.set('clubId', clubId);
    body.set('userId', userId);

    return this.http.delete('http://localhost:5000/book-club/delete-member', {
      headers: this.headers,
      withCredentials: true,
      body: body,
    });
  }

  addEvent(event: any) {
    const body = new URLSearchParams();
    body.set('clubId', this.currentClub._id);
    body.set('bookTitle', event.bookTitle);
    body.set('author', event.author);
    // body.set('coverUrl', event.coverUrl);
    body.set('description', event.description);
    body.set('date', event.date);
    body.set('meetingLink', event.meetingLink);

    return this.http.post('http://localhost:5000/book-club/add-event', body, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  deleteEvent(clubId: string, eventId: string) {
    const body = new URLSearchParams();
    body.set('clubId', clubId);
    body.set('eventId', eventId);

    return this.http.delete(
      'http://localhost:5000/book-club/delete-event',

      {
        headers: this.headers,
        body: body,
        withCredentials: true,
      }
    );
  }

  updateEvent(event: any, clubId: string, eventId: string) {
    const body = new URLSearchParams();

    body.set('eventId', eventId);
    body.set('clubId', clubId);
    body.set('description', event.description);
    body.set('bookTitle', event.bookTitle);
    body.set('meetingLink', event.meetingLink);
    body.set('author', event.author);
    // body.set('coverUrl', event.coverUrl);
    body.set('date', event.date);

    return this.http.put('http://localhost:5000/book-club/update-event', body, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
