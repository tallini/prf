import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClubService } from '../../../shared/services/club.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddModifyTemplateComponent } from '../../../shared/components/add-modify-template/add-modify-template.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddModifyTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
  eventForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      bookTitle: ['', [Validators.required, Validators.minLength(1)]],
      date: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      meetingLink: ['', []],
      author: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      console.log('Form data:', this.eventForm.value);
      this.clubService.addEvent(this.eventForm.value).subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log('Form is not valid.');
    }
  }
}
