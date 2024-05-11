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
    path: 'club-form',
    loadComponent: () =>
      import(
        './components/club/create-modify-club/create-modify-club.component'
      ).then((c) => c.CreateModifyClubComponent),
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
    path: 'event-form',
    loadComponent: () =>
      import(
        './components/event/create-modify-event/create-modify-event.component'
      ).then((c) => c.CreateModifyEventComponent),
    canActivate: [authGuard],
  },
  {
    path: 'comment-form',
    loadComponent: () =>
      import(
        './components/event/create-modify-comment/create-modify-comment.component'
      ).then((c) => c.CreateModifyCommentComponent),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
