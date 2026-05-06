<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        $this->authorize('view', Supplier::class);
        $suppliers = Supplier::select('id', 'name', 'email')->get();

        return response()->json($suppliers, 200);
    }

    public function show($id)
    {
        $supplier = Supplier::with('products')->findOrFail($id);
        $this->authorize('view', $supplier);

        return response()->json($supplier, 200);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Supplier::class);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email',
        ]);

        $supplier = Supplier::create([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json($supplier, 201);
    }

    public function update(Request $request, $id)
    {
        $supplier = Supplier::findOrFail($id);
        $this->authorize('update', $supplier);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:suppliers,email,' . $supplier->id,
        ]);

        $supplier->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        return response()->json($supplier, 200);
    }

    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
        $this->authorize('delete', $supplier);

        if ($supplier->products()->exists()) {
            return response()->json([
                'message' => 'No se puede eliminar un proveedor que tiene productos asociados'
            ], 400);
        }

        $supplier->delete();

        return response()->json([
            'message' => 'Proveedor eliminado correctamente'
        ], 200);
    }
}
