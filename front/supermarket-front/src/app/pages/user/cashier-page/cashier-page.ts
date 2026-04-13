import { Component, signal } from '@angular/core';
import { ProductList } from '../../../components/user/products/product-list/product-list';
import { ProductSearch } from '../../../components/user/products/product-search/product-search';
import { Cart } from '../../../components/user/cart/cart';

@Component({
  selector: 'app-cashier-page',
  imports: [ProductList, ProductSearch, Cart],
  templateUrl: './cashier-page.html',
  styleUrl: './cashier-page.css',
})
export class CashierPage {

  readonly searchTerm = signal('');

  onSearchChange(value: string) { 
    this.searchTerm.set(value)
  }

}
