import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenStorageService } from './shared/services/TokenStorageService/token-storage.service';
import { AuthService } from './shared/services/AuthService/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
})
export class App {
  readonly #authService = inject(AuthService);
  readonly #tokenStorageService = inject(TokenStorageService);

    constructor() {
    if (!this.#tokenStorageService.token) {
      return;
    }

    this.#authService.checkSession().subscribe({
      error: () => {
        this.#authService.logout();
      }
    });
  }
}