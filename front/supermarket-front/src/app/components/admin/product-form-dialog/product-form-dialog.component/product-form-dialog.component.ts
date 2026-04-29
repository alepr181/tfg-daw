import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
import { ProductFormDialogData } from '../../../../shared/interfaces/product-form-dialog-data.interface';
import { MatAutocomplete, MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';

@Component({
  selector: 'app-product-form-dialog',
  imports: [ReactiveFormsModule, MatDialogActions, MatDialogContent, MatDialogModule],
  templateUrl: './product-form-dialog.component.html',
  styleUrl: './product-form-dialog.component.css',
})
export class ProductFormDialogComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<ProductFormDialogComponent>);
  readonly data = inject<ProductFormDialogData>(MAT_DIALOG_DATA);

  readonly form = this.#formBuilder.nonNullable.group({
    name: [this.data.product?.name ?? '', Validators.required],
    barcode: [this.data.product?.barcode ?? '', Validators.required],
    price: [Number(this.data.product?.price ?? 0), [Validators.required, Validators.min(0.01)]],
    stock: [this.data.product?.stock ?? 0, [Validators.required, Validators.min(0)]],
    category_id: [this.data.product?.category_id ?? null, [Validators.required, Validators.min(1)]],
    supplier_id: [this.data.product?.supplier_id ?? null, [Validators.required, Validators.min(1)]],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rawValue = this.form.getRawValue();

    this.dialogRef.close({
      ...rawValue,
      category_id: Number(rawValue.category_id),
      supplier_id: Number(rawValue.supplier_id),
      price: Number(rawValue.price),
      stock: Number(rawValue.stock),
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}