import { Component, inject } from '@angular/core';
import { MetricService } from '../../../shared/services/MetricService/metric-service';

@Component({
  selector: 'app-metrics',
  imports: [],
  templateUrl: './metrics.component.html',
  styleUrl: './metrics.component.css',
})
export class MetricsComponent {
  readonly #metricService = inject(MetricService);

  readonly metricsResource = this.#metricService.getMetricsResource();
}
