import { HttpClient } from '@angular/common/http';
import { inject, Injectable, ResourceRef, Signal, signal } from '@angular/core';
import { catchError, NEVER, Observable, tap, throwError } from 'rxjs';
import { OrderInterface } from '../../interfaces/order-interface';
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

  #load(): Observable<{ data: OrderInterface[]; total: number }> {
  return this.#http
    .get<{ data: OrderInterface[]; total: number }>(this.API_ENDPOINT)
    .pipe(
      tap((result) => this.#ordersSignal.set(result.data)),
      catchError((error) => {
        console.error('Failed to load orders', error);
        return throwError(() => error);
      }),
    );
}

  load(): ResourceRef<{ data: OrderInterface[]; total: number }> {
    return rxResource({
      stream: () => this.#load(),
      defaultValue: { data: [], total: 0 },
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
    orderToUpdateSignal: Signal<OrderPayloadUpdateInterface | null>,
  ): ResourceRef<OrderInterface | undefined> {
    return rxResource<OrderInterface, OrderPayloadUpdateInterface | null>({
      params: () => orderToUpdateSignal(),
      stream: ({ params }) =>
        params === null ? NEVER : this.#updateStatus(params),
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
    orderToRemoveSignal: Signal<OrderInterface | null>,
  ): ResourceRef<OrderInterface | undefined> {
    return rxResource<OrderInterface, OrderInterface | null>({
      params: () => orderToRemoveSignal(),
      stream: ({ params }) => (params === null ? NEVER : this.#remove(params)),
    });
  }
}



