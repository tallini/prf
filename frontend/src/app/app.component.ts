import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserManagementComponent } from './components/user-management/user-management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    LoginComponent,
    SignupComponent,
    UserManagementComponent,
  ],
})
export class AppComponent {
  title = 'prf-frontend valami';
}
