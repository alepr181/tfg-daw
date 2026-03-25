<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('123456'),
            'role' => 'admin',
            'account_status' => 'active',
        ]);

        User::create([
            'name' => 'Pepe',
            'email' => 'pepe@supermarket.com',
            'password' => Hash::make('123456'),
            'role' => 'user',
            'account_status' => 'active',
        ]);
    }
}
