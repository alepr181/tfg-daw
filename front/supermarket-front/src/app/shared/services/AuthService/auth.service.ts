import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthInterface, AuthResponseInterface } from '../../interfaces/auth.interface';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../TokenStorageService/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly API_ENDPOINT = 'http://127.0.0.1:8000/api/auth'; //WARNING -> TODO meter esto en variables de entorno!!

  readonly #httpClient = inject(HttpClient);
  readonly #tokenStorageService = inject(TokenStorageService);

  login(user: AuthInterface): Observable<{ token: string }> {
    return this.#httpClient.post<AuthResponseInterface>(`${this.API_ENDPOINT}/login`, user)
    .pipe(
      map((resp: any) => {
        this.#tokenStorageService.token = resp.token;
        return resp;
      }));
  }

  logout(): void {
    this.#tokenStorageService.logout();
  }
}
