import { Component, computed, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInterface } from '../../../shared/interfaces/auth.interface';

@Component({
  selector: 'app-login-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  readonly #formBuilder = inject(FormBuilder);

  readonly isLoading = input<boolean>(false);
  readonly loginSubmit = output<AuthInterface>();

  readonly loginForm = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly isSubmitDisabled = computed(
    () => this.loginForm.invalid || this.isLoading(),
  );

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  showEmailErrors(): boolean {
    return this.emailControl.invalid && (this.emailControl.touched || this.emailControl.dirty);
  }

  showPasswordErrors(): boolean {
    return this.passwordControl.invalid && (this.passwordControl.touched || this.passwordControl.dirty);
  }

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loginSubmit.emit(this.loginForm.getRawValue());
  }
}