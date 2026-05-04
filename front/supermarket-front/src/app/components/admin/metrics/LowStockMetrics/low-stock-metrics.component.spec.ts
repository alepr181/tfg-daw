import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LowStockMetricsComponent } from './low-stock-metrics.component/low-stock-metrics.component';

describe('LowStockMetricsComponent', () => {
  let component: LowStockMetricsComponent;
  let fixture: ComponentFixture<LowStockMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LowStockMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LowStockMetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
