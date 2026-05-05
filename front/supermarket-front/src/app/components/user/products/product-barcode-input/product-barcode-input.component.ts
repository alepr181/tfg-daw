import { Component, output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-barcode-input',
  imports: [FormsModule],
  templateUrl: './product-barcode-input.component.html',
  styleUrl: './product-barcode-input.component.css',
})
export class ProductBarcodeInputComponent {

  barcodeSubmit = output<string>();

  onSubmit(barcode: string) {
    
    this.barcodeSubmit.emit(barcode);
  }

}
