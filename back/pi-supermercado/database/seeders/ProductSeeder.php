<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */

    public function run(): void
    {
        $bebidas = Category::where('name', 'Bebidas')->first();
        $lacteos = Category::where('name', 'Lácteos')->first();

        $coca = Supplier::where('name', 'Coca-Cola Europacific Partners')->first();
        $pascual = Supplier::where('name', 'Pascual Distribución')->first();

        $products = [
            [
                'name' => 'Coca-Cola 2L',
                'barcode' => '100000000001',
                'price' => 2.15,
                'stock' => 30,
                'category_id' => $bebidas->id,
                'supplier_id' => $coca->id,
            ],
            [
                'name' => 'Fanta Naranja 2L',
                'barcode' => '100000000002',
                'price' => 2.10,
                'stock' => 25,
                'category_id' => $bebidas->id,
                'supplier_id' => $coca->id,
            ],
            [
                'name' => 'Leche Entera 1L',
                'barcode' => '100000000003',
                'price' => 1.10,
                'stock' => 50,
                'category_id' => $lacteos->id,
                'supplier_id' => $pascual->id,
            ],
        ];

        foreach ($products as $p) {
            Product::create($p);
        }
    }
}
