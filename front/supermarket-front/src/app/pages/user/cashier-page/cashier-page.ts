import { Component, inject, signal } from '@angular/core';
import { ProductList } from '../../../components/user/products/product-list/product-list';
import { ProductSearch } from '../../../components/user/products/product-search/product-search';
import { Cart } from '../../../components/user/cart/cart';
import { CashierHeaderComponent } from '../../../components/user/cashier-header/cashier-header.component';
import { ProductBarcodeInputComponent } from '../../../components/user/products/product-barcode-input/product-barcode-input.component';
import { CartService } from '../../../shared/services/CartService/cart.service';

@Component({
  selector: 'app-cashier-page',
  imports: [ProductList, ProductSearch, Cart, CashierHeaderComponent, ProductBarcodeInputComponent],
  templateUrl: './cashier-page.html',
  styleUrl: './cashier-page.css',
})
export class CashierPage {

  readonly searchTerm = signal('');
  readonly #cartService = inject(CartService);

  onSearchChange(value: string) { 
    this.searchTerm.set(value)
  }

  onBarcodeSubmit(barcode: string) {
    this.#cartService.addProductByBarcode(barcode);
  }
}
