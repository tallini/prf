import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { ClubCardComponent } from './shared/components/club-card/club-card.component';
import { MenuButtonComponent } from './shared/components/menu-button/menu-button.component';
import { CreateClubComponent } from './components/club/create-club/create-club.component';
import { PageTemplateComponent } from './shared/components/page-template/page-template.component';
import { AddModifyTemplateComponent } from './shared/components/add-modify-template/add-modify-template.component';
import { ClubPageComponent } from './components/club/club-page/club-page.component';
import { CreateEventComponent } from './components/event/create-event/create-event.component';
import { EventPageComponent } from './components/event/event-page/event-page.component';

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
    PageTemplateComponent,
    AddModifyTemplateComponent,
    ClubPageComponent,
    CreateEventComponent,
    EventPageComponent,
  ],
})
export class AppComponent {
  title = 'prf-frontend valami';
}
