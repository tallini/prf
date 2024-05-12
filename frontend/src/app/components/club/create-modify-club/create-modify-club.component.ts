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
import { Club } from '../../../shared/models/Club';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-modify-club',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddModifyTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './create-modify-club.component.html',
  styleUrl: './create-modify-club.component.scss',
})
export class CreateModifyClubComponent {
  clubForm!: FormGroup;
  clubId!: string;
  club!: Club;
  isModifyMode: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.clubForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      scedule: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });

    this.route.queryParams.subscribe((params) => {
      if (params['clubId']) {
        this.isModifyMode = true;
        this.clubId = params['clubId'];
        // TODO: Eltárolni a clubServiceben a lekért clubot,
        // és akkor kérni le csak újból ha nem egyezik az id!
        this.clubService.get(this.clubId).subscribe({
          next: (data) => {
            this.club = data;
            this.clubForm.setValue({
              name: this.club.name,
              scedule: this.club.scedule,
              description: this.club.description,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  onSubmit() {
    if (this.clubForm.valid) {
      if (this.isModifyMode) {
        this.clubService.update(this.clubForm.value);
      } else {
        this.clubService.create(this.clubForm.value).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    } else {
      console.log('Form is not valid.');
    }
  }
}
