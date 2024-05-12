import { Component } from '@angular/core';
import { AddModifyTemplateComponent } from '../../shared/components/add-modify-template/add-modify-template.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../shared/services/user.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddModifyTemplateComponent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  userForm!: FormGroup;
  user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: [''],
      firstName: [''],
      lastName: [''],
    });

    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.userForm.setValue({
        email: this.user?.email,
        username: this.user?.username,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
      });
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form data:', this.userForm.value);

      this.userService.update(this.userForm.value).subscribe({
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

  deleteUser() {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe({
      next: (data) => {
        if (data) {
          this.userService
            .delete(this.authService.getCurrentUser()._id)
            .subscribe({
              next: (data) => {
                console.log(data);
              },
              error: (err) => {
                console.log(err);
              },
            });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
