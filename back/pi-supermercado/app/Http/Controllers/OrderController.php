<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with([
            'user',
            'items.product'
        ])->get();

        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:pending,completed,cancelled',
            'payment_method' => 'required|string',
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $order = DB::transaction(function () use ($request) {
            $total = 0;

            $order = Order::create([
                'user_id' => $request->user_id,
                'status' => $request->status,
                'payment_method' => $request->payment_method,
                'total' => 0,
            ]);

            foreach ($request->items as $item) {
                $product = Product::findOrFail($item['product_id']);

                if ($product->stock < $item['quantity']) {
                    abort(response()->json([
                        'message' => "Stock insuficiente para el producto {$product->name}"
                    ], 400));
                }

                $subtotal = $product->price * $item['quantity'];
                $total += $subtotal;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->price,
                    'subtotal' => $subtotal,
                ]);

                $product->decrement('stock', $item['quantity']);
            }

            $order->update([
                'total' => $total
            ]);

            return $order->load('items.product', 'user');
        });

        return response()->json([
            'message' => 'Pedido creado correctamente',
            'order' => $order
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $order = Order::with('user', 'orderItems.product')->findOrFail($id);

        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id) //Cambiar el estado del pedido
    {
        $request->validate([
            'status' => 'required|string'
        ]);

        $order = Order::findOrFail($id);

        $order->update([
            'status' => $request->status
        ]);

        return response()->json($order, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = Order::findOrFail($id);

        // Devolver el stock de los productos
        foreach ($order->items as $item) {
            $product = Product::findOrFail($item->product_id);
            $product->increment('stock', $item->quantity);
        }

        $order->delete();

        return response()->json([
            'message' => 'Pedido eliminado correctamente'
        ], 200);

    }
}
