import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodsMetricsComponent } from './payment-methods-metrics.component';

describe('PaymentMethodsMetricsComponent', () => {
  let component: PaymentMethodsMetricsComponent;
  let fixture: ComponentFixture<PaymentMethodsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaymentMethodsMetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
