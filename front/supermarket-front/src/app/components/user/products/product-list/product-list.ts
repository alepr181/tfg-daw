import { Component, effect, inject, input } from '@angular/core';
import { ProductService } from '../../../../shared/services/ProductService/product.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  
    constructor() {
    effect(() => {
      const term = this.searchTerm() ?? '';
      this.#productService.setSearchTerm(term);
    });
  }

  searchTerm = input<string>();


  readonly #productService = inject(ProductService);

  readonly products = this.#productService.filteredProducts;
  readonly productsResource = this.#productService.load();

}
