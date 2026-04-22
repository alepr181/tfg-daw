import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/AuthGuard/auth-guard';
import { roleGuard } from './shared/guards/RoleGuard/role-guard';
import { guestGuard } from './shared/guards/GuestGuard/guest-guard';

export const routes: Routes = [
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
},
    {
        path: 'login',
        canActivate: [guestGuard],
        loadComponent:() => import('./pages/login/login-page.component').then((c) => c.LoginPageComponent)
    },
{
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadComponent: () =>
    import('./pages/admin/index/admin-index.component/admin-index.component').then(
        (c) => c.AdminIndexComponent,
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