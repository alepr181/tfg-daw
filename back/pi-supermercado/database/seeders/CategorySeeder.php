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
        'Limpieza',
        'Panadería',
        'Carnicería',
        'Pescadería',
        'Congelados',
        'Conservas',
        'Desayuno',
        'Pasta y Arroz',
        'Salsas',
        'Dulces',
        'Café e Infusiones',
        'Higiene Personal',
        'Perfumería',
        'Mascotas',
        'Bebé',
        'Hogar',
        'Detergentes',
        'Helados',
        'Embutidos',
        'Frutos Secos',
    ];


        foreach ($categories as $name) {
            \App\Models\Category::create([
                'name' => $name
            ]);
        }
    }
}
