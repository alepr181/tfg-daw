import { Component, computed, inject } from '@angular/core';
import { MetricService } from '../../../shared/services/MetricService/metric-service';
import { SummaryMetricsComponent } from '../../../components/admin/metrics/SummaryMetrics/summary-metrics.component';
import { PaymentMethodsMetricsComponent } from '../../../components/admin/metrics/PaymentMethodsMetrics/payment-methods-metrics.component';
import { TopProductsMetricsComponent } from '../../../components/admin/metrics/TopProductMetrics/top-products-metrics.component';
import { LowStockMetricsComponent } from '../../../components/admin/metrics/LowStockMetrics/low-stock-metrics.component';

@Component({
  selector: 'app-metrics',
  imports: [SummaryMetricsComponent, TopProductsMetricsComponent, PaymentMethodsMetricsComponent, LowStockMetricsComponent],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.css',
})
export class MetricsComponent {
  readonly #metricService = inject(MetricService);

  readonly metricsResource = this.#metricService.getMetricsResource();
  readonly metrics = computed( () => this.metricsResource.value() );
}
