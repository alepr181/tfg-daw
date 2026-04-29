import { Component, computed, effect, inject, signal } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product-interface';
import { ProductService } from '../../../shared/services/ProductService/product.service';
import { SearchBoxComponent } from '../../../components/admin/search-box/search-box.component';
import { ProductFormDialogComponent } from '../../../components/admin/product-form-dialog/product-form-dialog.component/product-form-dialog.component';
import { ProductFormDialogData } from '../../../shared/interfaces/product-form-dialog-data.interface';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../../shared/services/CategoryService/category.service';
import { SupplierService } from '../../../shared/services/SupplierService/supplier.service';
import { ProductPayloadCreateInterface, ProductPayloadUpdateInterface } from '../../../shared/interfaces/product-payload.interface';
import { ConfirmDialogComponent } from '../../../components/admin/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-products.component',
  imports: [SearchBoxComponent],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css',
})
export class AdminProductsComponent {
  readonly #productService = inject(ProductService);

  readonly productsResource = this.#productService.load();

  readonly products = this.#productService.filteredProducts;
  readonly isLoading = computed(() => this.productsResource.isLoading());
  readonly hasError = computed(() => this.productsResource.status() === 'error');
  readonly #dialog = inject(MatDialog);
  readonly #categoryService = inject(CategoryService);
  readonly #supplierService = inject(SupplierService);
  readonly #matSnackBar = inject(MatSnackBar);
  readonly categoriesResource = this.#categoryService.load();

  readonly suppliersResource = this.#supplierService.load();
  
  readonly categories = this.#categoryService.categories;
  readonly suppliers = this.#supplierService.suppliers;


  readonly productCreateSignal = signal<ProductPayloadCreateInterface | undefined>(undefined);
  readonly productCreateResource = this.#productService.add(this.productCreateSignal);


  readonly productUpdateSignal = signal<ProductPayloadUpdateInterface | undefined>(undefined);
  readonly productUpdateResource = this.#productService.update(this.productUpdateSignal);


  readonly productDeleteSignal = signal<ProductInterface | undefined>(undefined);
  readonly productDeleteResource = this.#productService.remove(this.productDeleteSignal);

constructor() {
  effect(() => {
    if (this.productDeleteResource.status() === 'error') {
      const error = this.productDeleteResource.error() as HttpErrorResponse | undefined;

      const message =
        error?.error?.message ?? 'Error al eliminar producto';

      this.#matSnackBar.open(message, 'Cerrar', {
        duration: 3000,
      });
    }
  });
}


addProduct(): void {
  const dialogRef = this.#dialog.open<ProductFormDialogComponent, ProductFormDialogData>(
    ProductFormDialogComponent,
    {
      width: '640px',
      maxWidth: '100vw',
      data: {
        product: null,
        categories: this.categories(),
        suppliers: this.suppliers(),
      },
    },
  );
  

  dialogRef.afterClosed().subscribe((result: ProductPayloadCreateInterface) => {
    if (!result) {
      return;
    }

    this.productCreateSignal.set(result);
  });
}
  deleteProduct(product: ProductInterface): void {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Eliminar ${product.name}?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.productDeleteSignal.set(product);
    });
  }

  getCategoryName(product: ProductInterface): string {
    return product.category?.name ?? 'Sin categoría';
  }

  getSupplierName(product: ProductInterface): string {
    return product.supplier?.name ?? 'Sin proveedor';
  }

  searchProducts(term: string): void {
  this.#productService.setSearchTerm(term);
}

editProduct(product: ProductInterface): void {
  const dialogRef = this.#dialog.open<ProductFormDialogComponent, ProductFormDialogData>(
    ProductFormDialogComponent,
    {
      width: '640px',
      maxWidth: '100vw',
      data: {
        product,
        categories: this.categories(),
        suppliers: this.suppliers(),
      },
    },
  );

  dialogRef.afterClosed().subscribe((result: ProductPayloadCreateInterface) => {
    if (!result) {
      return;
    }

    this.productUpdateSignal.set({
      id: product.id,
      ...result,
    });
  });
}

}

