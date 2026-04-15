import { Component, inject } from '@angular/core';
import { CartService } from '../../../shared/services/CartService/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly #cartService = inject(CartService);

  readonly items = this.#cartService.items;
  readonly subtotal = this.#cartService.subtotal;
  readonly total = this.#cartService.total;
  readonly totalItems = this.#cartService.totalItems;

  increaseQuantity(productId: number): void {
    this.#cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.#cartService.decreaseQuantity(productId);
  }

  removeProduct(productId: number): void {
    this.#cartService.removeProduct(productId);
  }

  clearCart(): void {
    this.#cartService.clearCart();
  }
}
