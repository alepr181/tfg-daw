import { Component, input } from '@angular/core';
import { SummaryInterface } from '../../../../shared/interfaces/metric.interface';

@Component({
  selector: 'app-summary-metrics',
  imports: [],
  templateUrl: './summary-metrics.component.html',
  styleUrl: './summary-metrics.component.css',
})
export class SummaryMetricsComponent {
  readonly summary = input.required<SummaryInterface>();
}