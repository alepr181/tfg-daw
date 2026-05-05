import { Component, inject, signal } from '@angular/core';
import { CartService } from '../../../shared/services/CartService/cart.service';
import { OrderService } from '../../../shared/services/OrderService/order.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from '../ticket-dialog/ticket-dialog.component';


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
  readonly #dialog = inject(MatDialog);



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

    this.#orderService.add(payload).subscribe({
      next: (order) => {
        this.#snackBar.open(`Pedido creado con ID ${order.order.id}`, "OK",{ duration: 3000 });

        this.#cartService.clearCart();

        this.#dialog.open(TicketDialogComponent, {
          width: '500px',
          data: {
            id: order.order.id
          }
        });

      },
      error: (error) => {
        this.#snackBar.open('Error al crear pedido', "OK",{ duration: 3000 });
      }
    });
  }
}
