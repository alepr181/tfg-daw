import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../../services/TokenStorageService/token-storage.service';
import { inject } from '@angular/core';

export const guestGuard: CanActivateFn = () => {
  const tokenStorageService = inject(TokenStorageService);
  const router = inject(Router);

  const user = tokenStorageService.user();

  if (!tokenStorageService.isLogin() || !user) {
    return true;
  }

  if (user.role === 'admin') {
    return router.createUrlTree(['/admin']);
  }

  return router.createUrlTree(['/cashier']);
};