import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopProductsMetricsComponent } from './top-products-metrics.component';

describe('TopProductsMetricsComponent', () => {
  let component: TopProductsMetricsComponent;
  let fixture: ComponentFixture<TopProductsMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopProductsMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopProductsMetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
