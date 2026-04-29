import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SupplierPayloadCreateInterface } from '../../../shared/interfaces/supplier-payload.interface';
import { SupplierFormDialogData } from '../../../shared/interfaces/supplier-form-dialog-data.interface';


@Component({
  selector: 'app-supplier-form-dialog',
  imports: [ReactiveFormsModule, MatDialogActions, MatDialogContent, MatDialogModule],
  templateUrl: './supplier-form-dialog.component.html',
  styleUrl: './supplier-form-dialog.component.css',
})
export class SupplierFormDialogComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<SupplierFormDialogComponent>);
  readonly data = inject<SupplierFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.#formBuilder.nonNullable.group({
    name: [this.data.supplier?.name ?? '', Validators.required],
    email: [this.data.supplier?.email ?? '', [Validators.required, Validators.email]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();

    this.dialogRef.close({
      ...rawValue,
    } as SupplierPayloadCreateInterface);
  }

  close(): void {
    this.dialogRef.close();
  }
}