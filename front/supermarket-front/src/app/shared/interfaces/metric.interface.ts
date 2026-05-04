export interface DashboardMetricsInterface {
    summary: SummaryInterface;
    top_products: TopProductInterface[];
    low_stock_products: LowStockProductInterface[];
    payment_methods: PaymentMethodInterface[];
}

export interface SummaryInterface {
    total_revenue: number;
    total_orders: number;
    completed_orders: number;
    pending_orders: number;
    cancelled_orders: number;
    total_products: number;
}

export interface TopProductInterface {
    product_id: number;
    name: string;
    stock: number;
    price: number;
    total_sold: number;
    total_revenue: number;
}

export interface LowStockProductInterface {
    product_id: number;
    name: string;
    stock: number;
    price: number;
}

export interface PaymentMethodInterface {
    payment_method: string;
    total_orders: number;
    total_revenue: number;
}