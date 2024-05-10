import { Component } from '@angular/core';
import { AddModifyTemplateComponent } from '../../../shared/components/add-modify-template/add-modify-template.component';
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

@Component({
  selector: 'app-create-club',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddModifyTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './create-club.component.html',
  styleUrl: './create-club.component.scss',
})
export class CreateClubComponent {
  clubForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.clubForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      scedule: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  onSubmit() {
    if (this.clubForm.valid) {
      console.log('Form data:', this.clubForm.value);
      this.clubService.create(this.clubForm.value).subscribe({
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
