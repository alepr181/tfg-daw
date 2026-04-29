import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupplierPayloadCreateInterface, SupplierPayloadUpdateInterface } from '../../../shared/interfaces/supplier-payload.interface';
import { SupplierService } from '../../../shared/services/SupplierService/supplier.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SupplierInterface } from '../../../shared/interfaces/supplier.interface';
import { SupplierFormDialogComponent } from '../../../components/admin/supplier-form-dialog/supplier-form-dialog.component';
import { SupplierFormDialogData } from '../../../shared/interfaces/supplier-form-dialog-data.interface';
import { ConfirmDialogComponent } from '../../../components/admin/confirm-dialog/confirm-dialog.component';
import { SearchBoxComponent } from '../../../components/admin/search-box/search-box.component';

@Component({
  selector: 'app-admin-suppliers.component',
  imports: [SearchBoxComponent],
  templateUrl: './admin-suppliers.component.html',
  styleUrl: './admin-suppliers.component.css',
})
export class AdminSuppliersComponent {
  readonly #supplierService = inject(SupplierService);

  readonly suppliersResource = this.#supplierService.load();

  readonly suppliers = this.#supplierService.filteredSuppliers;
  readonly isLoading = computed(() => this.suppliersResource.isLoading());
  readonly hasError = computed(() => this.suppliersResource.status() === 'error');

  readonly #dialog = inject(MatDialog);
  readonly #matSnackBar = inject(MatSnackBar);

  readonly supplierCreateSignal = signal<SupplierPayloadCreateInterface | undefined>(undefined);
  readonly supplierCreateResource = this.#supplierService.add(this.supplierCreateSignal);

  readonly supplierUpdateSignal = signal<SupplierPayloadUpdateInterface | undefined>(undefined);
  readonly supplierUpdateResource = this.#supplierService.update(this.supplierUpdateSignal);

  readonly supplierDeleteSignal = signal<SupplierInterface | undefined>(undefined);
  readonly supplierDeleteResource = this.#supplierService.remove(this.supplierDeleteSignal);

  constructor() {
    effect(() => {
      if (this.supplierDeleteResource.status() === 'error') {
        const error = this.supplierDeleteResource.error() as HttpErrorResponse | undefined;

        const message =
          error?.error?.message ?? 'Error al eliminar proveedor';

        this.#matSnackBar.open(message, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  addSupplier(): void {
    const dialogRef = this.#dialog.open<SupplierFormDialogComponent, SupplierFormDialogData>(
      SupplierFormDialogComponent,
      {
        width: '640px',
        maxWidth: '100vw',
        data: {
          supplier: null,
        },
      },
    );

    dialogRef.afterClosed().subscribe((result: SupplierPayloadCreateInterface) => {
      if (!result) {
        return;
      }

      this.supplierCreateSignal.set(result);
    });
  }

  editSupplier(supplier: SupplierInterface): void {
    const dialogRef = this.#dialog.open<SupplierFormDialogComponent, SupplierFormDialogData>(
      SupplierFormDialogComponent,
      {
        width: '640px',
        maxWidth: '100vw',
        data: {
          supplier,
        },
      },
    );

    dialogRef.afterClosed().subscribe((result: SupplierPayloadCreateInterface) => {
      if (!result) {
        return;
      }

      this.supplierUpdateSignal.set({
        id: supplier.id,
        ...result,
      });
    });
  }

  deleteSupplier(supplier: SupplierInterface): void {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Eliminar ${supplier.name}?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.supplierDeleteSignal.set(supplier);
    });
  }

  searchSuppliers(term: string): void {
    this.#supplierService.setSearchTerm(term);
  }
}