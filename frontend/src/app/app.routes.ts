import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'signup',
    loadComponent: () =>
      import('./components/signup/signup.component').then(
        (c) => c.SignupComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: 'user-management',
    loadComponent: () =>
      import('./components/user-management/user-management.component').then(
        (c) => c.UserManagementComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home-page/home-page.component').then(
        (c) => c.HomePageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'create-club',
    loadComponent: () =>
      import('./components/club/create-club/create-club.component').then(
        (c) => c.CreateClubComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'club',
    loadComponent: () =>
      import('./components/club/club-page/club-page.component').then(
        (c) => c.ClubPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'event',
    loadComponent: () =>
      import('./components/event/event-page/event-page.component').then(
        (c) => c.EventPageComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'create-event',
    loadComponent: () =>
      import('./components/event/create-event/create-event.component').then(
        (c) => c.CreateEventComponent
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
