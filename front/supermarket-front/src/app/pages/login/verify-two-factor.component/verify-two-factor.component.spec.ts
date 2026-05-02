import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTwoFactorComponent } from './verify-two-factor.component';

describe('VerifyTwoFactorComponent', () => {
  let component: VerifyTwoFactorComponent;
  let fixture: ComponentFixture<VerifyTwoFactorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyTwoFactorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyTwoFactorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
