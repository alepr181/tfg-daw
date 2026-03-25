<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category', 'supplier')->get();

        return response()->json($products, 200);
    }

    public function show($id)
    {
        $product = Product::with('category', 'supplier')->findOrFail($id);

        return response()->json($product, 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255|unique:products,barcode',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        $product = Product::create([
            'name' => $request->name,
            'barcode' => $request->barcode,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'supplier_id' => $request->supplier_id,
        ]);

        $product->load('category', 'supplier');

        return response()->json([
            'message' => 'Producto creado correctamente',
            'product' => $product
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'barcode' => 'required|string|max:255|unique:products,barcode,' . $product->id,
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'supplier_id' => 'required|exists:suppliers,id',
        ]);

        $product->update([
            'name' => $request->name,
            'barcode' => $request->barcode,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'supplier_id' => $request->supplier_id,
        ]);

        $product->load('category', 'supplier');

        return response()->json([
            'message' => 'Producto actualizado correctamente',
            'product' => $product
        ], 200);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->orderItems()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar un producto que ya está asociado a pedidos'
            ], 400);
        }

        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente'
        ], 200);
    }
}
