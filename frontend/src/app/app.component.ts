import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ClubCardComponent } from './shared/components/club-card/club-card.component';
import { MenuButtonComponent } from './shared/components/menu-button/menu-button.component';
import { CreateClubComponent } from './components/create-club/create-club.component';

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
    HomePageComponent,
    HeaderComponent,
    ClubCardComponent,
    MenuButtonComponent,
    CreateClubComponent,
  ],
})
export class AppComponent {
  title = 'prf-frontend valami';
}
