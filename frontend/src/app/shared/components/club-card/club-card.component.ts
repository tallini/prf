import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-club-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './club-card.component.html',
  styleUrl: './club-card.component.scss',
})
export class ClubCardComponent {
  @Input() cardContent: any = '';
}
