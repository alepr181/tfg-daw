<h2>Ticket de compra</h2>

<p>Gracias por tu compra.</p>

<p>
    Adjuntamos el ticket correspondiente al pedido
    <strong>#{{ $order->id }}</strong>.
</p>

<p>
    Total:
    <strong>{{ number_format($order->total, 2, ',', '.') }} €</strong>
</p>

<p>
    Fecha:
    {{ $order->created_at->format('d/m/Y H:i') }}
</p>
