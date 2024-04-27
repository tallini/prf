import { Component, Input } from '@angular/core';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-page-template',
  standalone: true,
  imports: [MenuButtonComponent, HeaderComponent],
  templateUrl: './page-template.component.html',
  styleUrl: './page-template.component.scss',
})
export class PageTemplateComponent {
  @Input() title: string = '';
  @Input() backButton: boolean = false;
  @Input() addNewButton: boolean = false;
  @Input() addNewFunction: () => void = () => {};
}
