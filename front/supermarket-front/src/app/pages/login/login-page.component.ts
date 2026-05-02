import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthService } from '../../shared/services/AuthService/auth.service';
import { AuthInterface, AuthResponseInterface, LoginResponseInterface, TwoFactorRequiredResponseInterface } from '../../shared/interfaces/auth.interface';
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
    () => this.loginResource.value() as LoginResponseInterface | undefined,
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

    if (!response) {
      return;
    }

    if (this.#isTwoFactorRequiredResponse(response)) {
      void this.#router.navigate(['/verify-2fa'], {
        queryParams: { email: response.email },
      });

      return;
    }

    void this.#router.navigate(['/']);
  });

  onLoginSubmit(payload: AuthInterface): void {
    this.loginPayload.set(payload);
  }

  #isTwoFactorRequiredResponse(
    response: LoginResponseInterface,
  ): response is TwoFactorRequiredResponseInterface {
    return 'requires_2fa' in response && response.requires_2fa;
  }
}