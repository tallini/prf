import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageTemplateComponent } from '../page-template/page-template.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-modify-template',
  standalone: true,
  imports: [
    PageTemplateComponent,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './add-modify-template.component.html',
  styleUrl: './add-modify-template.component.scss',
})
export class AddModifyTemplateComponent {
  @Input() title: string = '';
  @Input() form!: FormGroup;
  @Output() onSubmitEvent: EventEmitter<any> = new EventEmitter();

  onSubmit() {
    this.onSubmitEvent.emit();
  }
}
