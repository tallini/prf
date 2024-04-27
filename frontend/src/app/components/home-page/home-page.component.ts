import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ClubCardComponent } from '../../shared/components/club-card/club-card.component';
import { CommonModule } from '@angular/common';
import { PageTemplateComponent } from '../../shared/components/page-template/page-template.component';

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
  cards: any[] = [
    {
      title: 'Card 1',
      date: 'Szerdánként',
      description:
        'Valami amikor akarsz de lehet nem is kell jönni valammi valami valami ',
    },
    {
      title: 'Card 2',
      date: 'Héthetente kedden',
      description:
        'Valami amikor akarsz de lehet nem is kell jönni valammi valami valami ',
    },
    {
      title: 'Card 3',
      date: 'Havonta',
      description:
        'Valami amikor akarsz de lehet nem is kell jönni valammi valami valami ',
    },
    // Add more cards as needed
  ];

  addNewClub() {
    console.log('yay hozzáadok!');
  }
}
