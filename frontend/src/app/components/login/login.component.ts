import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    this.isLoading = true;
    setTimeout(() => {
      if (this.username && this.password) {
        this.errorMessage = '';
        this.authService.login(this.username, this.password).subscribe({
          next: (data) => {
            if (data) {
              // navigation
              this.isLoading = false;
              this.router.navigateByUrl('/user-management');
            }
          },
          error: (err) => {
            this.isLoading = false;
          },
        });
      } else {
        this.isLoading = false;
        this.errorMessage = 'Form is empty.';
      }
    }, 1500);
  }

  navigate(to: string) {
    this.router.navigateByUrl(to);
  }
}
