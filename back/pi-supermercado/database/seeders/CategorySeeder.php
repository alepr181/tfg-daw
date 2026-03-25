<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Bebidas',
            'Lácteos',
            'Frutas',
            'Verduras',
            'Snacks',
            'Limpieza'
        ];

        foreach ($categories as $name) {
            \App\Models\Category::create([
                'name' => $name
            ]);
        }
    }
}
