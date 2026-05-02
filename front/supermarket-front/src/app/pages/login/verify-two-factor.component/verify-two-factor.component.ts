import { Component, computed, effect, inject, signal } from '@angular/core';
import { VerifyTwoFactorFormComponent } from '../../../components/login/verify-two-factor-form.component/verify-two-factor-form.component';
import { AuthService } from '../../../shared/services/AuthService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthResponseInterface, TwoFactorVerifyInterface } from '../../../shared/interfaces/auth.interface';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-verify-two-factor',
  imports: [VerifyTwoFactorFormComponent],
  templateUrl: './verify-two-factor.component.html',
  styleUrl: './verify-two-factor.component.css',
})
export class VerifyTwoFactorPageComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  readonly #route = inject(ActivatedRoute);
  readonly #snackBar = inject(MatSnackBar);

  readonly email = signal(this.#route.snapshot.queryParamMap.get('email') ?? '');

  readonly verifyPayload = signal<TwoFactorVerifyInterface | undefined>(undefined);

  readonly verifyResource = rxResource({
    params: () => this.verifyPayload(),
    stream: ({ params }) => this.#authService.verifyTwoFactor(params),
  });

  readonly isLoading = computed(() => this.verifyResource.isLoading());
  readonly hasError = computed(() => this.verifyResource.status() === 'error');
  readonly isSuccess = computed(() => this.verifyResource.status() === 'resolved');

  readonly response = computed(
    () => this.verifyResource.value() as AuthResponseInterface | undefined,
  );

  readonly missingEmailEffect = effect(() => {
    if (this.email() !== '') {
      return;
    }

    this.#snackBar.open(
      'Primero debes iniciar sesión para recibir el código.',
      'Cerrar',
      { duration: 5000 },
    );

    void this.#router.navigate(['/login']);
  });

  readonly showErrorEffect = effect(() => {
    if (!this.hasError()) {
      return;
    }

    this.#snackBar.open(
      'Código incorrecto o caducado.',
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

  onVerifySubmit(code: string): void {
    this.verifyPayload.set({
      email: this.email(),
      code,
    });
  }

  #redirectByRole(role: 'admin' | 'user'): void {
    if (role === 'admin') {
      void this.#router.navigate(['/admin']);
      return;
    }

    void this.#router.navigate(['/cashier']);
  }
}