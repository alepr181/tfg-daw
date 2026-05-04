import { Component, input } from '@angular/core';
import { TopProductInterface } from '../../../../shared/interfaces/metric.interface';

@Component({
  selector: 'app-top-products-metrics',
  imports: [],
  templateUrl: './top-products-metrics.component.html',
  styleUrl: './top-products-metrics.component.css',
})
export class TopProductsMetricsComponent {
    readonly products = input.required<TopProductInterface[]>();
}
