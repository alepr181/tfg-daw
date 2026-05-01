import { OrderPayloadUpdateInterface } from './order-payload.interface';
import { OrderInterface } from './order.interface';

export interface OrderDetailDialogData {
    order: OrderInterface;
    updateStatus: (payload: OrderPayloadUpdateInterface) => void;

}