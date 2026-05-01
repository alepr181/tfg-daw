export interface OrderItemPayload {
    product_id: number;
    quantity: number;
}

export interface OrderPayloadCreateInterface {
    user_id: number;
    status: string;
    payment_method: string;
    items: OrderItemPayload[];
}

export interface OrderPayloadUpdateInterface {
    id: number;
    status: 'pending' | 'paid' | 'cancelled' | 'completed';
}