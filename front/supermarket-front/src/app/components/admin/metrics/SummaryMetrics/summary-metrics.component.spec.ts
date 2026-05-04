import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryMetricsComponent } from './summary-metrics.component';

describe('SummaryMetricsComponent', () => {
  let component: SummaryMetricsComponent;
  let fixture: ComponentFixture<SummaryMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryMetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
