import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItemPayload, OrderPayload } from '../../interfaces/order-payload.interface';
import { OrderInterface } from '../../interfaces/order-interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  readonly #http = inject(HttpClient);

  private readonly API_ENDPOINT = 'http://127.0.0.1:8000/api/orders'; //WARNING -> TODO meter esto en variables de entorno!!

  createOrder(orderPayload: OrderPayload): Observable<any> {
    return this.#http.post(this.API_ENDPOINT, orderPayload);
  }
}
