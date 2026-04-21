import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../../shared/services/CartService/cart.service';
import { OrderService } from '../../../shared/services/OrderService/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly #cartService = inject(CartService);
  readonly #orderService = inject(OrderService);
  #snackBar = inject(MatSnackBar)


  readonly paymentMethod = signal<string>('cash');
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

  setPaymentMethod(method: string): void {
    if (method === 'cash' || method == 'card') {
      this.paymentMethod.set(method);
    }
}

  checkout(): void {
  const payload = this.#cartService.buildOrderPayload(2, this.paymentMethod());

  this.#orderService.createOrder(payload).subscribe({
    next: (order) => {
      this.#snackBar.open(`Pedido creado con ID ${order.order.id}`, "OK");

      this.#cartService.clearCart();
    },
    error: (error) => {
      this.#snackBar.open('Error al crear pedido', "OK")
    }
  });

  
}
}
