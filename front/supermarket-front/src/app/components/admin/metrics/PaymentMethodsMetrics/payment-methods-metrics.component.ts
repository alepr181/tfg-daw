import { Component, input } from '@angular/core';
import { PaymentMethodInterface } from '../../../../shared/interfaces/metric.interface';

@Component({
  selector: 'app-payment-methods-metrics',
  imports: [],
  templateUrl: './payment-methods-metrics.component.html',
  styleUrl: './payment-methods-metrics.component.css',
})
export class PaymentMethodsMetricsComponent {
    readonly paymentMethods = input.required<PaymentMethodInterface[]>();


    formatPaymentMethod(method: string): string {
    const paymentMethods: Record<string, string> = {
      cash: 'Efectivo',
      card: 'Tarjeta',
    };

    return paymentMethods[method];
  }
}
