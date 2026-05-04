import { inject, Injectable, ResourceRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardMetricsInterface } from '../../interfaces/metric.interface';
import { HttpClient } from '@angular/common/http';
import { MetricServiceAbstract } from './metric.service.abstract';
import { rxResource } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class MetricService extends MetricServiceAbstract {

  #http = inject(HttpClient);
  
    getMetrics(): Observable<DashboardMetricsInterface> {
    return this.#http.get<DashboardMetricsInterface>(
      `${this.API_URL}/metrics/dashboard`
    );
  }

  getMetricsResource(): ResourceRef<DashboardMetricsInterface> {
    return rxResource({
      stream: () => this.getMetrics(),
      defaultValue: {} as DashboardMetricsInterface
    });
  }
}

