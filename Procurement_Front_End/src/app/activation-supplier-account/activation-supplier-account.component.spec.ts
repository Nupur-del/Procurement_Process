import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationSupplierAccountComponent } from './activation-supplier-account.component';

describe('ActivationSupplierAccountComponent', () => {
  let component: ActivationSupplierAccountComponent;
  let fixture: ComponentFixture<ActivationSupplierAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivationSupplierAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivationSupplierAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
