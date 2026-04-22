import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login-page/login-page.component').then(
        (m) => m.LoginPageComponent,
      ),
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadComponent: () =>
      import('./pages/admin-page/admin-page.component').then(
        (m) => m.AdminPageComponent,
      ),
  },
  {
    path: 'cashier',
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' },
    loadComponent: () =>
      import('./pages/user/cashier-page/cashier-page').then(
        (m) => m.CashierPage,
      ),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
];