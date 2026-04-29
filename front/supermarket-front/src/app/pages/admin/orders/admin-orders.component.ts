import { Component, computed, effect, inject, signal } from '@angular/core';
import { OrderService } from '../../../shared/services/OrderService/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderInterface } from '../../../shared/interfaces/order.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../../components/admin/confirm-dialog/confirm-dialog.component';
import { SearchBoxComponent } from '../../../components/admin/search-box/search-box.component';

@Component({
  selector: 'app-admin-orders.component',
  imports: [SearchBoxComponent],
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.css',
})
export class AdminOrdersComponent {
  readonly #orderService = inject(OrderService);

  readonly ordersResource = this.#orderService.load();

  readonly orders = this.#orderService.filteredOrders;
  readonly isLoading = computed(() => this.ordersResource.isLoading());
  readonly hasError = computed(() => this.ordersResource.status() === 'error');

  readonly #dialog = inject(MatDialog);
  readonly #matSnackBar = inject(MatSnackBar);

  readonly orderDeleteSignal = signal<OrderInterface | undefined>(undefined);
  readonly orderDeleteResource = this.#orderService.remove(this.orderDeleteSignal);

  readonly STATUS_TYPES: Record<string, string> = {
  pending: 'Pendiente',
  completed: 'Completado',
  cancelled: 'Cancelado',
  paid: 'Pagado',
};

readonly PAYMENT_METHODS: Record<string, string> = {
  card: 'Tarjeta',
  cash: 'Efectivo',
};

  constructor() {
    effect(() => {
      if (this.orderDeleteResource.status() === 'error') {
        const error = this.orderDeleteResource.error() as HttpErrorResponse | undefined;

        const message =
          error?.error?.message ?? 'Error al eliminar pedido';

        this.#matSnackBar.open(message, 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  viewOrder(order: OrderInterface): void {
    console.log('Ver pedido', order);
  }

  deleteOrder(order: OrderInterface): void {
    const dialogRef = this.#dialog.open(ConfirmDialogComponent, {
      data: { message: `¿Eliminar el pedido #${order.id}?` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.orderDeleteSignal.set(order);
    });
  }

  searchOrders(term: string): void {
    this.#orderService.setSearchTerm(term);
  }

  getUserName(order: OrderInterface): string {
    return order.user.name;
  }

  formatDate(date: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

formatStatus(status: string): string {
  return this.STATUS_TYPES[status] ?? status;
}

formatPaymentMethod(method: string): string {
  return this.PAYMENT_METHODS[method] ?? method;
}

}  

