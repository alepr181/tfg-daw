import { Component, input } from '@angular/core';
import { LowStockProductInterface } from '../../../../shared/interfaces/metric.interface';

@Component({
  selector: 'app-low-stock-metrics',
  imports: [],
  templateUrl: './low-stock-metrics.component.html',
  styleUrl: './low-stock-metrics.component.css',
})
export class LowStockMetricsComponent {


  readonly products = input.required<LowStockProductInterface[]>();

  readonly STOCK_RULES: { max: number; status: {label: string; class: string} }[] = [
    {
      max: 0,
      status: {
        label: 'Sin stock',
        class: 'bg-red-100 text-red-700',
      },
    },
    {
      max: 5,
      status: {
        label: 'Crítico',
        class: 'bg-orange-100 text-orange-700',
      },
    },
    {
      max: 10,
      status: {
        label: 'Bajo',
        class: 'bg-amber-100 text-amber-700',
      },
    },
  ];


  getStockStatus(stock: number): {label: string; class: string} {
    const rule = this.STOCK_RULES.find((rule) => stock <= rule.max);

    if (rule) {
      return rule.status;
    }

    return {
      label: 'OK',
      class: 'bg-emerald-100 text-emerald-700',
    };
  }


}
