import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTwoFactorFormComponent } from './verify-two-factor-form.component';

describe('VerifyTwoFactorFormComponent', () => {
  let component: VerifyTwoFactorFormComponent;
  let fixture: ComponentFixture<VerifyTwoFactorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyTwoFactorFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyTwoFactorFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
