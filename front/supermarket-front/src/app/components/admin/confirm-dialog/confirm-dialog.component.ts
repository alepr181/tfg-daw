import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog.component',
  imports: [MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
    readonly data = inject<{ message: string }>(MAT_DIALOG_DATA);

    close(result: boolean) {
    this.dialogRef.close(result);
  }
}
