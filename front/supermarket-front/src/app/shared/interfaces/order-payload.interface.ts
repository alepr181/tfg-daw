export interface OrderItemPayload {
    product_id: number;
    quantity: number;
}

export interface OrderPayload {
    user_id: number;
    status: string;
    payment_method: string;
    items: OrderItemPayload[];
}