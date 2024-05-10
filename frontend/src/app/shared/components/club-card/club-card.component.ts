import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Club } from '../../models/Club';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './club-card.component.html',
  styleUrl: './club-card.component.scss',
})
export class ClubCardComponent {
  @Input() cardContent!: Club;

  constructor(private router: Router) {}

  onClick() {
    console.log('Ez a content: ', this.cardContent);
    this.router.navigate(['/club'], {
      queryParams: { clubId: this.cardContent._id },
    });
  }
}
