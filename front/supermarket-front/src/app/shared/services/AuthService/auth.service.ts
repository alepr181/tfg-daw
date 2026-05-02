import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthInterface, AuthResponseInterface, LoginResponseInterface, TwoFactorVerifyInterface } from '../../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../TokenStorageService/token-storage.service';
import { UserInterface } from '../../interfaces/user-interface';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_ENDPOINT = `${environment.apiUrl}/auth`;
  readonly #httpClient = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #tokenStorageService = inject(TokenStorageService);

  login(user: AuthInterface): Observable<LoginResponseInterface> {
    return this.#httpClient
      .post<LoginResponseInterface>(`${this.API_ENDPOINT}/login`, user)
      .pipe(
        tap((resp) => {
          if ('token' in resp) {
            this.#tokenStorageService.token = resp.token;
            this.#tokenStorageService.userData = resp.user;
          }
        }),
      );
  }

  verifyTwoFactor(payload: TwoFactorVerifyInterface): Observable<AuthResponseInterface> {
    return this.#httpClient
      .post<AuthResponseInterface>(`${this.API_ENDPOINT}/verify-2fa`, payload)
      .pipe(
        tap((resp) => {
          this.#tokenStorageService.token = resp.token;
          this.#tokenStorageService.userData = resp.user;
        }),
      );
  }
  checkSession(): Observable<UserInterface> {
    return this.#httpClient
      .get<UserInterface>(`${this.API_ENDPOINT}/me`)
      .pipe(
        tap((user) => {
          this.#tokenStorageService.userData = user;
        }),
      );
  }
  logout(): void {
    this.#tokenStorageService.logout();
    this.#router.navigateByUrl('/login');
  }
}
