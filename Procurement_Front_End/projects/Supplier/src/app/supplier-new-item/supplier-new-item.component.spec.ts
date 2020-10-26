import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierNewItemComponent } from './supplier-new-item.component';

describe('SupplierNewItemComponent', () => {
  let component: SupplierNewItemComponent;
  let fixture: ComponentFixture<SupplierNewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierNewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierNewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
