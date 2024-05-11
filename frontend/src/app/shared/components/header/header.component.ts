import { Component, EventEmitter, Input, Output } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private router: Router, private location: Location) {}
  @Input() title: string = '';
  @Input() backButton: boolean = false;
  @Input() addNewButton: boolean = false;
  @Input() modifyButton: boolean = false;
  @Output() onAddNew: EventEmitter<any> = new EventEmitter();
  @Output() onModify: EventEmitter<any> = new EventEmitter();

  public addNew() {
    this.onAddNew.emit();
  }

  public modify() {
    this.onModify.emit();
  }

  goBack() {
    this.location.back();
  }
}
