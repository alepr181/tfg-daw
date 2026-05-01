import { Component, computed, effect, inject, signal } from '@angular/core';
import { OrderService } from '../../../shared/services/OrderService/order.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderInterface } from '../../../shared/interfaces/order.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../../components/admin/confirm-dialog/confirm-dialog.component';
import { SearchBoxComponent } from '../../../components/admin/search-box/search-box.component';
import { OrderDetailDialogComponent } from '../../../components/admin/order-detail-dialog/order-detail-dialog.component';
import { OrderDetailDialogData } from '../../../shared/interfaces/order-detail-dialog-data.interface';
import { OrderPayloadUpdateInterface } from '../../../shared/interfaces/order-payload.interface';

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
  readonly orderUpdateSignal = signal<OrderPayloadUpdateInterface | undefined>(undefined);
  readonly orderUpdateResource = this.#orderService.updateStatus(this.orderUpdateSignal);



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
    this.#dialog.open<OrderDetailDialogComponent, OrderDetailDialogData>(
      OrderDetailDialogComponent,
      {
        width: '720px',
        maxWidth: '100vw',
        data: {
          order,
          updateStatus: (payload: OrderPayloadUpdateInterface) => {
          this.orderUpdateSignal.set(payload);
        }
        },
      },
    );
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
    return this.#orderService.formatStatus(status);
  }

  formatPaymentMethod(method: string): string {
    return this.#orderService.formatPaymentMethod(method);
  }



}  

