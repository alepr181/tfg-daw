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
    path: 'verify-2fa',
    loadComponent: () =>
        import('./pages/login/verify-two-factor.component/verify-two-factor.component')
        .then((m) => m.VerifyTwoFactorPageComponent),
},
{
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { role: 'admin' },
    loadComponent: () =>
    import('./pages/admin/index/admin-index.component').then(
        (c) => c.AdminIndexComponent,
    ),
    children: [
{
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
},
    {
    path: 'dashboard',
    loadComponent: () =>
    import('./pages/admin/metrics/metrics.component')
        .then((m) => m.MetricsComponent),
    },
{
    path: 'products',
    loadComponent: () =>
    import('./pages/admin/products/admin-products.component').then(
        (c) => c.AdminProductsComponent,
    ),
},
{
    path: 'users',
    loadComponent: () =>
    import('./pages/admin/users/admin-users.component').then(
        (c) => c.AdminUsersComponent,
    ),
},
{
    path: 'orders',
    loadComponent: () =>
    import('./pages/admin/orders/admin-orders.component').then(
        (c) => c.AdminOrdersComponent,
    ),
},
{
    path: 'suppliers',
    loadComponent: () =>
    import('./pages/admin/suppliers/admin-suppliers.component').then(
        (c) => c.AdminSuppliersComponent,
    ),
    },
],
},
{
    path: 'cashier',
    canActivate: [authGuard, roleGuard],
    data: { role: 'user' },
    loadComponent: () =>
    import('./pages/user/cashier-page/cashier-page').then(
        (c) => c.CashierPage,
    ),
},
{
    path: '**',
    redirectTo: 'login',
},
];