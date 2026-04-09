import { Component, inject } from '@angular/core';
import { ProductService } from '../../../../shared/services/ProductService/product.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [JsonPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  readonly #productService = inject(ProductService);

  readonly products = this.#productService.products;
  readonly productsResource = this.#productService.load();

}
