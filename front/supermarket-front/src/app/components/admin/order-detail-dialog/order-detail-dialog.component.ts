import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OrderDetailDialogData } from '../../../shared/interfaces/order-detail-dialog-data.interface';
import { OrderService } from '../../../shared/services/OrderService/order.service';
import { OrderPayloadUpdateInterface } from '../../../shared/interfaces/order-payload.interface';

@Component({
  selector: 'app-order-detail-dialog.component',
  imports: [MatDialogModule, MatDialogContent, MatDialogActions],
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.css',
})
export class OrderDetailDialogComponent {
  readonly dialogRef = inject(MatDialogRef<OrderDetailDialogComponent>);
  readonly data = inject<OrderDetailDialogData>(MAT_DIALOG_DATA);
  readonly #orderService = inject(OrderService);

  

  close(): void {
    this.dialogRef.close();
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

  changeStatus(e: Event): void {
  const status = (e.target as HTMLSelectElement)
    .value as OrderPayloadUpdateInterface['status'];

  this.data.updateStatus({
    id: this.data.order.id,
    status,
  });

}
}