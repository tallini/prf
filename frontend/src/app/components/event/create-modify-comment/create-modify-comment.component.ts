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
import { Comment } from '../../../shared/models/Comment';
import { CommentService } from '../../../shared/services/comment.service';

@Component({
  selector: 'app-create-modify-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddModifyTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './create-modify-comment.component.html',
  styleUrl: './create-modify-comment.component.scss',
})
export class CreateModifyCommentComponent {
  isModifyMode: boolean = false;
  commentForm!: FormGroup;
  clubId!: string;
  eventId!: string;
  commentId!: string;
  comment!: Comment;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      rate: ['', [Validators.required, Validators.minLength(1)]],
      text: ['', [Validators.required, Validators.minLength(1)]],
    });

    this.route.queryParams.subscribe((params) => {
      this.clubId = params['clubId'];
      this.eventId = params['eventId'];

      if (params['commentId']) {
        this.isModifyMode = true;
        this.commentId = params['commentId'];
        // TODO: Eltárolni a clubServiceben a lekért clubot,
        // és akkor kérni le csak újból ha nem egyezik az id!
        this.commentService.getOne(this.commentId).subscribe({
          next: (data) => {
            this.comment = data as Comment;

            this.commentForm.setValue({
              rate: this.comment.rate,
              text: this.comment.text,
            });
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });
  }

  // TODO: ne kérje le a hogy ki csinálta, legyen az szerver oldalon megoldva

  onSubmit() {
    if (this.commentForm.valid) {
      console.log('Form data:', this.commentForm.value);
      if (this.isModifyMode) {
        this.commentService.update(this.commentForm.value).subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this.commentService
          .create(this.clubId, this.eventId, this.commentForm.value)
          .subscribe({
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
