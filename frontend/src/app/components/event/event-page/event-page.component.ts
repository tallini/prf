import { Component } from '@angular/core';
import { PageTemplateComponent } from '../../../shared/components/page-template/page-template.component';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../../../shared/services/club.service';
import { Club } from '../../../shared/models/Club';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ClubCardComponent } from '../../../shared/components/club-card/club-card.component';
import { Event } from '../../../shared/models/Event';
import { Comment } from '../../../shared/models/Comment';
import { CommentService } from '../../../shared/services/comment.service';

@Component({
  selector: 'app-club-page',
  standalone: true,
  imports: [
    PageTemplateComponent,
    MatCardModule,
    CommonModule,
    ClubCardComponent,
  ],
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.scss',
})
export class EventPageComponent {
  clubId!: string;
  eventId!: string;
  event!: Event;
  club!: Club;
  comments!: [Comment];

  constructor(
    private route: ActivatedRoute,
    protected clubService: ClubService,
    protected commentService: CommentService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.clubId = params['clubId'];
      this.eventId = params['eventId'];

      this.clubService.get(this.clubId).subscribe({
        next: (data) => {
          this.club = data;
          this.clubService.setCurrentClub(data);
          this.event = data.events.find(
            (single_event) => single_event._id == this.eventId
          ) as Event;
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.commentService.get(this.clubId, this.eventId).subscribe({
        next: (data) => {
          this.comments = data;
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }
}
