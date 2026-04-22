import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../../services/TokenStorageService/token-storage.service';
import { inject } from '@angular/core';
import { UserInterface } from '../../interfaces/user-interface';

export const roleGuard: CanActivateFn = (route) => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);

  const requiredRole = route.data['role'] as UserInterface['role'] | undefined;
  const user = tokenStorageService.user();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  if (!requiredRole) {
    return true;
  }

  if (user.role === requiredRole) {
    return true;
  }

  return router.createUrlTree([user.role === 'admin' ? '/admin' : '/cashier']);
};
