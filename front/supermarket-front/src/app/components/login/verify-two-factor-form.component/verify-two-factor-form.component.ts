import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-two-factor-form',
  imports: [ReactiveFormsModule],
  templateUrl: './verify-two-factor-form.component.html',
  styleUrl: './verify-two-factor-form.component.css',
})
export class VerifyTwoFactorFormComponent {
  readonly #formBuilder = inject(FormBuilder);

  readonly isLoading = input(false);
  readonly sendCode = output<string>();

  public message = '';

  public twoFactorForm = this.#formBuilder.nonNullable.group({
    code: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^\d{6}$/),],
    ],
  });

  get codeControl() {
    return this.twoFactorForm.controls.code;
  }

  verify(): void {
    if (this.twoFactorForm.invalid) {
      this.message = 'Introduce un código válido.';
      this.twoFactorForm.markAllAsTouched();
      return;
    }

    this.message = '';
    this.sendCode.emit(this.twoFactorForm.controls.code.value);
  }
}
