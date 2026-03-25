<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'pepe@supermarket.com')->first();

        $products = Product::take(3)->get();
        // PEDIDO 1
        $order1 =
            Order::create([
                'user_id' => $user->id,
                'status' => 'paid',
                'total' => 0,
                'payment_method' => 'card',
            ]);

        $total = 0;

        foreach ($products as $product) {
            $quantity = rand(1, 3);
            $subtotal = $product->price * $quantity;


            OrderItem::create([
                'order_id' => $order1->id,
                'product_id' => $product->id,
                'quantity' => $quantity,
                'unit_price' => $product->price,
                'subtotal' => $subtotal,
            ]);

            $total += $subtotal;
        }

        $order1->update([
            'total' => $total
        ]);

        // 🔹 PEDIDO 2
        $order2 = Order::create([
            'user_id' => $user->id,
            'status' => 'pending',
            'total' => 0,
            'payment_method' => 'cash',
        ]);

        $product =
            Product::inRandomOrder()->first();

        $quantity = 2;
        $subtotal = $product->price * $quantity;

        OrderItem::create([
            'order_id' => $order2->id,
            'product_id' => $product->id,
            'quantity' => $quantity,
            'unit_price' => $product->price,
            'subtotal' => $subtotal,
        ]);

        $order2->update([
            'total' => $subtotal
        ]);
    }
}
