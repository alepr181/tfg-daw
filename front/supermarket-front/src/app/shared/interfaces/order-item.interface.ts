export interface OrderItemInterface {
    id: number;
    product_id: number;
    quantity: number;
    unit_price: number;
    subtotal: number;

    product: {
        id: number;
        name: string;
    };
}