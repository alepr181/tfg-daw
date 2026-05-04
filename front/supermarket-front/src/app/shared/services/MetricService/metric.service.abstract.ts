import { Observable } from "rxjs";
import { DashboardMetricsInterface } from "../../interfaces/metric.interface";
import { ResourceRef } from "@angular/core";
import { environment } from "../../../environments/environment";

export abstract class MetricServiceAbstract {

    readonly API_URL = `${environment.apiUrl}/metrics`;

    abstract getMetrics(): Observable<DashboardMetricsInterface>;
    abstract getMetricsResource(): ResourceRef<DashboardMetricsInterface>;
}