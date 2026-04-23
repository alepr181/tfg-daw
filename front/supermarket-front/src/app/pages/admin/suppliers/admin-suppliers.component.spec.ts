import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSuppliersComponent } from './admin-suppliers.component';

describe('AdminSuppliersComponent', () => {
  let component: AdminSuppliersComponent;
  let fixture: ComponentFixture<AdminSuppliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSuppliersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminSuppliersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
