<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Factura</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background: #f5f5f5; }
    </style>
</head>
<body>

<h1>Factura #{{ $order->id }}</h1>

<p><strong>Ha sido usted atendido por:</strong> {{ $order->user->name }}</p>
<p><strong>Fecha:</strong> {{ $order->created_at }}</p>
<p><strong>Método de pago:</strong> {{ $order->payment_method }}</p>


<table>
    <thead>
    <tr>
        <th>Producto</th>
        <th>Cantidad</th>
        <th>Precio</th>
        <th>Subtotal</th>
    </tr>
    </thead>
    <tbody>
    @foreach ($order->items as $item)
        <tr>
            <td>{{ $item->product->name }}</td>
            <td>{{ $item->quantity }}</td>
            <td>{{ $item->unit_price }} €</td>
            <td>{{ $item->subtotal }} €</td>
        </tr>
    @endforeach
    </tbody>
</table>

<h3>Total: {{ $order->total }} €</h3>

</body>
</html>
