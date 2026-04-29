import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, ResourceRef, Signal, signal } from '@angular/core';
import { catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { OrderInterface } from '../../interfaces/order.interface';
import { OrderPayloadCreateInterface, OrderPayloadUpdateInterface } from '../../interfaces/order-payload.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { OrderServiceAbstract } from './order.service.abstract';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends OrderServiceAbstract {

  readonly #http = inject(HttpClient);

  readonly #ordersSignal = signal<OrderInterface[]>([]);
  readonly orders = this.#ordersSignal.asReadonly();
  readonly #searchTerm = signal('');

  setSearchTerm(value: string): void {
    this.#searchTerm.set(value);
  }

  readonly STATUS_TYPES: Record<string, string> = {
    pending: 'Pendiente',
    completed: 'Completado',
    cancelled: 'Cancelado',
    paid: 'Pagado',
  };

  readonly PAYMENT_METHODS: Record<string, string> = {
    card: 'Tarjeta',
    cash: 'Efectivo',
  };

  readonly filteredOrders = computed(() => {
    const term = this.#searchTerm().trim().toLowerCase();

    if (!term) {
      return this.#ordersSignal();
    }

    return this.#ordersSignal().filter((order) =>
      order.id.toString().includes(term)
    );
  });

  #load(): Observable<OrderInterface[]> {
  return this.#http
    .get<OrderInterface[]>(this.API_ENDPOINT)
    .pipe(
      tap((result) => this.#ordersSignal.set(result )),
      catchError((error) => {
        console.error('Failed to load orders', error);
        return throwError(() => error);
      }),
    );
}

  load(): ResourceRef<OrderInterface[]> {
    return rxResource({
      stream: () => this.#load(),
      defaultValue: [], 
    });
  }

  add(orderPayload: OrderPayloadCreateInterface): Observable<any> {
    return this.#http.post(this.API_ENDPOINT, orderPayload);
  }

  #updateStatus(order: OrderPayloadUpdateInterface): Observable<OrderInterface> {
  return this.#http
    .patch<OrderInterface>(`${this.API_ENDPOINT}/${order.id}`, {
      status: order.status,
    })
    .pipe(
      tap((updatedOrder) => {
        this.#ordersSignal.update((currentOrders) =>
          currentOrders.map((currentOrder) =>
            currentOrder.id === updatedOrder.id ? updatedOrder : currentOrder
          ),
        );
      }),
      catchError((error) => {
        console.error('Failed to update order status', error);
        return throwError(() => error);
      }),
    );
}

  updateStatus(
    orderToUpdateSignal: Signal<OrderPayloadUpdateInterface | undefined>,
  ): ResourceRef<OrderInterface | undefined> {
    return rxResource<OrderInterface, OrderPayloadUpdateInterface | undefined>({
      params: () => orderToUpdateSignal(),
      stream: ({ params }) =>
        params === undefined ? EMPTY : this.#updateStatus(params),
    });
  }

  #remove(order: OrderInterface): Observable<OrderInterface> {
    return this.#http
      .delete<OrderInterface>(`${this.API_ENDPOINT}/${order.id}`)
      .pipe(
        tap(() => {
          this.#ordersSignal.update((currentOrders) =>
            currentOrders.filter((currentOrder) => currentOrder.id !== order.id),
          );
        }),
        catchError((error) => {
          console.error('Failed to delete order', error);
          return throwError(() => error);
        }),
      );
  }

  remove(
    orderToRemoveSignal: Signal<OrderInterface | undefined>,
  ): ResourceRef<OrderInterface | undefined> {
    return rxResource<OrderInterface, OrderInterface | undefined>({
      params: () => orderToRemoveSignal(),
      stream: ({ params }) =>
        params === undefined ? EMPTY : this.#remove(params),
    });
  }

  formatStatus(status: string): string {
  return this.STATUS_TYPES[status] ?? status;
}

  formatPaymentMethod(method: string): string {
  return this.PAYMENT_METHODS[method] ?? method;
}
}

