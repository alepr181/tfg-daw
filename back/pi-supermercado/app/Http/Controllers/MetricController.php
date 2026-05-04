<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class MetricController extends Controller
{
    //Con Eloquent y la función selectRaw podemos hacer operaciones sobre las queries de la DB.
    // Mi estrategia aquí es que el backend sea quien calcule directamente y se lo pase listo a Angular

    public function dashboard()
    {
        return response()->json([
            'summary' => $this->getSummary(),
            'sales_trend' => $this->getSalesTrend(),
            'top_products' => $this->getTopProducts(),
            'low_stock_products' => $this->getLowStockProducts(),
            'payment_methods' => $this->getPaymentMethods(),
        ]);
    }

    private function getSummary(): array
    {
        return [
            'total_revenue' => (float) Order::where('status', 'completed')->sum('total'),
            'total_orders' => Order::count(),
            'completed_orders' => Order::where('status', 'completed')->count(),
            'pending_orders' => Order::where('status', 'pending')->count(),
            'cancelled_orders' => Order::where('status', 'cancelled')->count(),
            'total_products' => Product::count(),
        ];
    }

    private function getSalesTrend(): array
    {
        return Order::query()
            ->selectRaw('DATE(created_at) as date')
            ->selectRaw('SUM(total) as l')
            ->selectRaw('COUNT(*) as orders_count')
            ->where('status', 'completed')
            ->groupByRaw('DATE(created_at)')
            ->orderBy('date')
            ->get()
            ->map(fn ($item) => [
                'date' => $item->date,
                'total' => (float) $item->total,
                'orders_count' => (int) $item->orders_count,
            ])
            ->toArray();
    }

    private function getTopProducts(): array
    {
        return OrderItem::query()
            ->select('product_id')
            ->selectRaw('SUM(quantity) as total_sold')
            ->selectRaw('SUM(subtotal) as total_revenue')
            ->with('product:id,name,stock,price')
            ->groupBy('product_id')
            ->orderByDesc('total_sold')
            ->limit(5)
            ->get()
            ->map(fn ($item) => [
                'product_id' => $item->product_id,
                'name' => $item->product?->name ?? 'Producto eliminado',
                'stock' => $item->product?->stock ?? 0,
                'price' => (float) ($item->product?->price ?? 0),
                'total_sold' => (int) $item->total_sold,
                'total_revenue' => (float) $item->total_revenue,
            ])
            ->toArray();
    }

    private function getLowStockProducts(): array
    {
        return Product::query()
            ->select('id', 'name', 'stock', 'price')
            ->orderBy('stock')
            ->limit(5)
            ->get()
            ->map(fn (Product $product) => [
                'product_id' => $product->id,
                'name' => $product->name,
                'stock' => (int) $product->stock,
                'price' => (float) $product->price,
            ])
            ->toArray();
    }

    private function getPaymentMethods(): array
    {
        return Order::query()
            ->select('payment_method')
            ->selectRaw('COUNT(*) as total_orders')
            ->selectRaw('SUM(total) as total_revenue')
            ->where('status', 'completed')
            ->groupBy('payment_method')
            ->orderByDesc('total_orders')
            ->get()
            ->map(fn ($item) => [
                'payment_method' => $item->payment_method,
                'total_orders' => (int) $item->total_orders,
                'total_revenue' => (float) $item->total_revenue,
            ])
            ->toArray();
    }
}
