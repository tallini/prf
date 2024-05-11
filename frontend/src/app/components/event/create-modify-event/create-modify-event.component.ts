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
import { ActivatedRoute } from '@angular/router';
import { Event } from '../../../shared/models/Event';

@Component({
  selector: 'app-create-modify-event',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddModifyTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './create-modify-event.component.html',
  styleUrl: './create-modify-event.component.scss',
})
export class CreateModifyEventComponent {
  isModifyMode: boolean = false;
  eventForm!: FormGroup;
  event!: Event;
  clubId!: string;
  eventId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private clubService: ClubService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.eventForm = this.formBuilder.group({
      bookTitle: ['', [Validators.required, Validators.minLength(1)]],
      date: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      meetingLink: ['', []],
      author: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.route.queryParams.subscribe((params) => {
      this.clubId = params['clubId'];

      if (params['eventId']) {
        this.isModifyMode = true;
        this.eventId = params['eventId'];
        // TODO: Eltárolni a clubServiceben a lekért clubot,
        // és akkor kérni le csak újból ha nem egyezik az id!
        this.clubService.get(this.clubId).subscribe({
          next: (data) => {
            this.event = data.events.find(
              (single_event) => single_event._id == this.eventId
            ) as Event;
            console.log(this.event);

            this.eventForm.setValue({
              bookTitle: this.event.bookTitle,
              date: this.event.date,
              description: this.event.description,
              meetingLink: this.event.meetingLink,
              author: this.event.author,
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
    if (this.eventForm.valid) {
      console.log('Form data:', this.eventForm.value);
      if (this.isModifyMode) {
        this.clubService
          .updateEvent(this.clubId, this.eventId, this.eventForm.value)
          .subscribe({
            next: (data) => {
              console.log(data);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this.clubService.addEvent(this.clubId, this.eventForm.value).subscribe({
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
