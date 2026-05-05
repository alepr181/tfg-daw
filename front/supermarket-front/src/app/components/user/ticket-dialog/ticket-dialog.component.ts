import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../shared/services/OrderService/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-dialog',
  imports: [MatDialogModule, ReactiveFormsModule],
  templateUrl: './ticket-dialog.component.html',
  styleUrl: './ticket-dialog.component.css',
})
export class TicketDialogComponent {
    readonly dialogRef = inject(MatDialogRef<TicketDialogComponent>);
    readonly data = inject<{ id: number }>(MAT_DIALOG_DATA);
    readonly #formBuilder = inject(FormBuilder);
    readonly #orderService = inject(OrderService);
    readonly #matSnackBar = inject(MatSnackBar);

    readonly emailForm = this.#formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  });

    get emailControl() {
      return this.emailForm.controls.email;
    }


    close() {
    this.dialogRef.close();
  }

    emailTicket(): void {
      const email = this.emailControl.value;
      if (this.emailForm.invalid) {
        this.emailForm.markAllAsTouched();
        return;
    }
      console.log('NO HA DEVUELTO')
      this.#orderService.emailTicket(this.data.id, this.emailControl.value).subscribe({
        next: () => {
          this.#matSnackBar.open(
            'Ticket enviado correctamente.',
            'Cerrar',
            { duration: 3000 },
          );

          this.close();
        },
        error: () => {
          this.#matSnackBar.open(
            'No se pudo enviar el ticket.',
            'Cerrar',
            { duration: 5000 },
          );
        },
      });
      this.dialogRef.close();
  }
    downloadTicket(): void {
      this.#orderService.downloadTicket(this.data.id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = `ticket-${this.data.id}.pdf`;
          link.click();

          window.URL.revokeObjectURL(url);
        },
        error: () => {
          this.#matSnackBar.open(
            'No se pudo descargar el ticket.',
            'Cerrar',
            { duration: 5000 },
          );
        },
      });
      this.dialogRef.close();
  }

    }

