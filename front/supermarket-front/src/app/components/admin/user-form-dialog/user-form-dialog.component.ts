import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
} from '@angular/material/dialog';
import { UserFormDialogData } from '../../../shared/interfaces/user-form-dialog-data.interface';
import { UserPayloadCreateInterface } from '../../../shared/interfaces/user-payload.interface';


@Component({
  selector: 'app-user-form-dialog',
  imports: [ReactiveFormsModule, MatDialogActions, MatDialogContent, MatDialogModule],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.css',
})
export class UserFormDialogComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<UserFormDialogComponent>);
  readonly data = inject<UserFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.#formBuilder.nonNullable.group({
    name: [this.data.user?.name ?? '', Validators.required],
    email: [this.data.user?.email ?? '', [Validators.required, Validators.email]],
    password: ['', this.data.user ? [] : [Validators.required, Validators.minLength(6)]],
    role: [this.data.user?.role ?? 'user', Validators.required],
    account_status: [this.data.user?.account_status ?? 'active', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();

    this.dialogRef.close({
      ...rawValue,
    } as UserPayloadCreateInterface);
  }

  close(): void {
    this.dialogRef.close();
  }
}