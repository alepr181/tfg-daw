<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MetricController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Autenticación email + password y check del código 2FA. Throttle limita a 5 peticiones por minuto desde una dirección IP por seguridad.
Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');
Route::post('/auth/verify-2fa', [AuthController::class, 'verifyTwoFactor'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    // Control de usuarios. Logout y me (obtener datos de la sesión)
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // CRUD de Pedidos - Cambio del estado
    Route::apiResource('orders', OrderController::class);

    //Generación de facturas

    Route::get('/orders/{order}/invoice', [OrderController::class, 'invoice']);

    // CRUD de Productos
    Route::apiResource('products', ProductController::class);

    // CRUD de Categorías
    Route::apiResource('categories', CategoryController::class);

    // CRUD de Proveedores
    Route::apiResource('suppliers', SupplierController::class);

    // CRUD de Usuarios
    Route::apiResource('users', UserController::class);

    // Control de métricas.
    Route::get('/metrics', [MetricController::class, 'dashboard']);
});
