import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '../../shared/services/AuthService/auth.service';
import { AuthInterface, AuthResponseInterface } from '../../shared/interfaces/auth.interface';
import { LoginFormComponent } from '../../components/login/login-form.component/login-form.component';

@Component({
  selector: 'app-login-page',
  imports: [LoginFormComponent],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly #snackBar = inject(MatSnackBar);

  readonly loginPayload = signal<AuthInterface | undefined>(undefined);

  readonly loginResource = rxResource({
    params: () => this.loginPayload(),
    stream: ({ params }) => this.#authService.login(params),
  });

  readonly isLoading = computed(() => this.loginResource.isLoading());
  readonly hasError = computed(() => this.loginResource.status() === 'error');
  readonly isSuccess = computed(() => this.loginResource.status() === 'resolved');

  readonly response = computed(
    () => this.loginResource.value() as AuthResponseInterface | undefined,
  );

  readonly showErrorEffect = effect(() => {
    if (!this.hasError()) {
      return;
    }

    this.#snackBar.open(
      'Error al iniciar sesión. Revisa tus credenciales o prueba más tarde.',
      'Cerrar',
      { duration: 8000 },
    );
  });

  readonly navigateEffect = effect(() => {
    if (!this.isSuccess()) {
      return;
    }

    const response = this.response();

    if (!response?.user) {
      return;
    }

    this.#redirectByRole(response.user.role);
  });

  onLoginSubmit(payload: AuthInterface): void {
    this.loginPayload.set(payload);
  }

  #redirectByRole(role: 'admin' | 'user'): void {
    if (role === 'admin') {
      void this.#router.navigate(['/admin']);
      return;
    }

    void this.#router.navigate(['/cashier']);
  }
}