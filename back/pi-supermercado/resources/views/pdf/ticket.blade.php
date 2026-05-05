<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Ticket #{{ $order->id }}</title>

    <style>
        @page {
            margin: 8px;
            size: 80mm 200mm;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            font-size: 11px;
            color: #111;
            margin: 0;
            padding: 0;
        }

        .ticket {
            width: 100%;
        }

        .center {
            text-align: center;
        }

        .bold {
            font-weight: bold;
        }

        .muted {
            color: #555;
        }

        .separator {
            border-top: 1px dashed #333;
            margin: 8px 0;
        }

        .row {
            display: table;
            width: 100%;
        }

        .col {
            display: table-cell;
            vertical-align: top;
        }

        .right {
            text-align: right;
        }

        .product {
            margin-bottom: 6px;
        }

        .total {
            font-size: 14px;
            font-weight: bold;
        }

        .small {
            font-size: 10px;
        }
    </style>
</head>

<body>
<div class="ticket">
    <div class="center">
        <div class="bold">TIENDA</div>
        <div class="small muted">Ticket de compra</div>
        <div class="small muted">Pedido #{{ $order->id }}</div>
    </div>

    <div class="separator"></div>

    <div class="small">
        <div>
            <span class="bold">Fecha:</span>
            {{ $order->created_at->format('d/m/Y H:i') }}
        </div>

        <div>
            <span class="bold">Atendido por:</span>
            {{ $order->user?->name }}
        </div>

        <div>
            <span class="bold">Pago:</span>
            {{ ucfirst($order->payment_method) }}
        </div>
    </div>

    <div class="separator"></div>

    @foreach ($order->items as $item)
        <div class="product">
            <div class="bold">
                {{ $item->product?->name }}
            </div>

            <div class="row">
                <div class="col">
                    {{ $item->quantity }} x {{ number_format($item->unit_price, 2, ',', '.') }} €
                </div>

                <div class="col right">
                    {{ number_format($item->subtotal, 2, ',', '.') }} €
                </div>
            </div>
        </div>
    @endforeach

    <div class="separator"></div>

    <div class="row total">
        <div class="col">
            TOTAL
        </div>

        <div class="col right">
            {{ number_format($order->total, 2, ',', '.') }} €
        </div>
    </div>

    <div class="separator"></div>

    <div class="center small muted">
        Gracias por su compra<br>
        Conserve este ticket como justificante
    </div>
</div>
</body>
</html>
