import { ComponentFixture, TestBed } from '@angular/core/testing';


describe('ProductBarcodeInputComponent', () => {
  let component: ProductBarcodeInputComponent;
  let fixture: ComponentFixture<ProductBarcodeInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBarcodeInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductBarcodeInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
