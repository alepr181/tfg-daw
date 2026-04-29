import { ResourceRef, Signal } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderInterface } from '../../interfaces/order.interface';
import { OrderPayloadCreateInterface, OrderPayloadUpdateInterface} from '../../interfaces/order-payload.interface';
import { environment } from '../../../environments/environment.dev';

    export abstract class OrderServiceAbstract {
    readonly API_ENDPOINT = `${environment.apiUrl}/orders`;

    abstract load(): ResourceRef<OrderInterface[]>;

    abstract add(
        orderPayload: OrderPayloadCreateInterface
    ): Observable<OrderInterface>;

    abstract updateStatus(
        orderToUpdateSignal: Signal<OrderPayloadUpdateInterface | undefined>
    ): ResourceRef<OrderInterface | undefined>;

    abstract remove(
        orderToRemoveSignal: Signal<OrderInterface | undefined>
    ): ResourceRef<OrderInterface | undefined>;

    abstract formatStatus(status: string): string;
    abstract formatPaymentMethod(method: string): string;
}