import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input() rating!: number;

  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }

  get emptyStars() {
    return Array(Math.floor(10 - this.rating)).fill(0);
  }
}
