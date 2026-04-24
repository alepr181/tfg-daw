import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from '../services/TokenStorageService/token-storage.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/AuthService/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenStorageService = inject(TokenStorageService);
  const token = tokenStorageService.token;
  const router = inject(Router);

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si Laravel devuelve un 401 es que el token ha expirado o el usuario no es válido.
      if (error.status === 401) {
        tokenStorageService.logout();
        void router.navigateByUrl('/login');
      }

      return throwError(() => error);
    }),
  );
};
