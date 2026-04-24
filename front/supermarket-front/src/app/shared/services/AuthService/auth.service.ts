import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { AuthInterface, AuthResponseInterface } from '../../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../TokenStorageService/token-storage.service';
import { UserInterface } from '../../interfaces/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_ENDPOINT = 'http://127.0.0.1:8000/api/auth'; //WARNING -> TODO meter esto en variables de entorno!!

  readonly #httpClient = inject(HttpClient);
  readonly #router = inject(Router);
  readonly #tokenStorageService = inject(TokenStorageService);

  login(user: AuthInterface): Observable<AuthResponseInterface> {
    return this.#httpClient
      .post<AuthResponseInterface>(`${this.API_ENDPOINT}/login`, user)
      .pipe(
        tap((resp) => {
          this.#tokenStorageService.token = resp.token;
          this.#tokenStorageService.userData = resp.user;
        }),
      )}; 
  
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
