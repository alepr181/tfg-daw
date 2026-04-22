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

  readonly isLoading = input(false);
  readonly sendLogin = output<AuthInterface>();

  public message = '';

  public loginForm = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.message = 'Revisa los campos del formulario';
      this.loginForm.markAllAsTouched();
      return;
    }

    this.message = '';
    this.sendLogin.emit(this.loginForm.getRawValue());
  }
}