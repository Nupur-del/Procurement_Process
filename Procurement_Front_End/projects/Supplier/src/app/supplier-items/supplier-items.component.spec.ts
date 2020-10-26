import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierItemsComponent } from './supplier-items.component';

describe('SupplierItemsComponent', () => {
  let component: SupplierItemsComponent;
  let fixture: ComponentFixture<SupplierItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
