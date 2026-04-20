import { Injectable, computed, signal } from '@angular/core';
import { ProductInterface } from '../../interfaces/product-interface';
import { CartProductInterface } from '../../interfaces/cart-product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly #itemsSignal = signal<CartProductInterface[]>([]);

  readonly items = this.#itemsSignal.asReadonly();

  readonly totalItems = computed(() =>
    this.#itemsSignal().reduce((total, item) => total + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.#itemsSignal().reduce((total, item) => total + item.subtotal, 0)
  );

  readonly total = computed(() => this.subtotal());

  addProduct(product: ProductInterface): void {
    const productPrice = Number(product.price);

    this.#itemsSignal.update((items) => {
      const existingItem = items.find((item) => item.productId === product.id);

      if (!existingItem) {
        return [
          ...items,
          {
            productId: product.id,
            name: product.name,
            price: productPrice,
            quantity: 1,
            stock: product.stock,
            subtotal: productPrice,
            product,
          },
        ];
      }

      return items.map((item) => {
        if (item.productId !== product.id) {
          return item;
        }

        const nextQuantity = item.quantity + 1;

        if (nextQuantity > item.stock) {
          return item;
        }

        return {
          ...item,
          quantity: nextQuantity,
          subtotal: nextQuantity * item.price,
        };
      });
    });
  }

  increaseQuantity(productId: number): void {
    this.#itemsSignal.update((items) =>
      items.map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        const nextQuantity = item.quantity + 1;

        if (nextQuantity > item.stock) {
          return item;
        }

        return {
          ...item,
          quantity: nextQuantity,
          subtotal: nextQuantity * item.price,
        };
      })
    );
  }

  decreaseQuantity(productId: number): void {
    this.#itemsSignal.update((items) =>
      items
        .map((item) => {
          if (item.productId !== productId) {
            return item;
          }

          const nextQuantity = item.quantity - 1;

          return {
            ...item,
            quantity: nextQuantity,
            subtotal: nextQuantity * item.price,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  }

  removeProduct(productId: number): void {
    this.#itemsSignal.update((items) =>
      items.filter((item) => item.productId !== productId)
    );
  }

  clearCart(): void {
    this.#itemsSignal.set([]);
  }

  buildOrderPayload(userId: number, paymentMethod: string) {
  return {
    user_id: userId,
    status: 'completed',
    payment_method: paymentMethod,
    items: this.#itemsSignal().map(item => ({
      product_id: item.productId,
      quantity: item.quantity
    }))
  };
}
}