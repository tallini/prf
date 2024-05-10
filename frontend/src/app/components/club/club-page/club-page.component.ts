import { Component } from '@angular/core';
import { PageTemplateComponent } from '../../../shared/components/page-template/page-template.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../../shared/services/club.service';
import { Club } from '../../../shared/models/Club';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ClubCardComponent } from '../../../shared/components/club-card/club-card.component';

@Component({
  selector: 'app-club-page',
  standalone: true,
  imports: [
    PageTemplateComponent,
    MatCardModule,
    CommonModule,
    ClubCardComponent,
  ],
  templateUrl: './club-page.component.html',
  styleUrl: './club-page.component.scss',
})
export class ClubPageComponent {
  clubId!: string;
  club!: Club;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.clubId = params['clubId'];

      this.clubService.get(this.clubId).subscribe({
        next: (data) => {
          this.club = data;
          this.clubService.setCurrentClub(data);
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    });
  }

  onEventClick(eventId: string) {
    this.router.navigate(['/event'], {
      queryParams: { clubId: this.clubId, eventId: eventId },
    });
  }
}
