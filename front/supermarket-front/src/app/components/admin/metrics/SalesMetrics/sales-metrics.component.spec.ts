import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesMetricsComponent } from './sales-metrics.component';

describe('SalesMetricsComponent', () => {
  let component: SalesMetricsComponent;
  let fixture: ComponentFixture<SalesMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SalesMetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
