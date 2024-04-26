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
  { path: '**', redirectTo: 'login' },
];
