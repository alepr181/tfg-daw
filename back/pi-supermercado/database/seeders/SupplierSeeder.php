<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupplierSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $suppliers = [
            ['name' => 'Coca-Cola Europacific Partners', 'email' => 'hola@spain.cocacola.com'],
            ['name' => 'Pascual Distribución', 'email' => 'negocios@calidadpascual.com'],
            ['name' => 'Frutas del Norte', 'email' => 'frutas.del.norte@outlook.es'],
            ['name' => 'Limpieza Hogar SL', 'email' => 'hogarcleaning@gmail.com'],
        ];

        foreach ($suppliers as $s) {
            \App\Models\Supplier::create($s);
        }
    }
}
