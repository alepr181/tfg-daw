import { Component, computed, inject } from '@angular/core';
import { ProductInterface } from '../../../shared/interfaces/product-interface';
import { ProductService } from '../../../shared/services/ProductService/product.service';
import { SearchBoxComponent } from '../../../components/admin/search-box/search-box.component';
import { ProductFormDialogComponent } from '../../../components/admin/product-form-dialog/product-form-dialog.component/product-form-dialog.component';
import { ProductFormDialogData } from '../../../shared/interfaces/product-form-dialog-data.interface';
import { MatDialog } from '@angular/material/dialog';

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


addProduct(): void {
  const dialogRef = this.#dialog.open<ProductFormDialogComponent, ProductFormDialogData>(
    ProductFormDialogComponent,
    {
      width: '640px',
      maxWidth: '100vw',
      data: {
        product: null,
        categories: [],
        suppliers: [],
      },
    },
  );

  dialogRef.afterClosed().subscribe((result) => {
    if (!result) {
      return;
    }

    console.log('Crear producto:', result);
  });
}
  editProduct(product: ProductInterface): void {
    console.log('Abrir modal editar producto', product);
  }

  deleteProduct(product: ProductInterface): void {
    console.log('Eliminar producto', product);
  }

  getCategoryName(product: ProductInterface): string {
    return product.category?.name ?? 'Sin categoría';
  }

  searchProducts(term: string): void {
  this.#productService.setSearchTerm(term);
}
}

