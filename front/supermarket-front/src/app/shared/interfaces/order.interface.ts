import { OrderItemInterface } from "./order-item.interface";

    export interface OrderInterface {
    id: number;
    user_id: number;
    status: string;
    total: number;
    payment_method: string;
    created_at: string;
    updated_at: string;

    user: {
        id: number;
        name: string;
        email: string;
    };

    items?: OrderItemInterface[];
    }