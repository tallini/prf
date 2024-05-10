import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ClubCardComponent } from '../../shared/components/club-card/club-card.component';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from '../../shared/components/page-template/page-template.component';
import { ClubService } from '../../shared/services/club.service';
import { Club } from '../../shared/models/Club';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatTabsModule,
    ClubCardComponent,
    CommonModule,
    PageTemplateComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  clubs!: Club[];

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit() {
    this.clubService.getAll().subscribe({
      next: (data) => {
        this.clubs = data;
        console.log(this.clubs);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
