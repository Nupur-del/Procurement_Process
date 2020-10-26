import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredPoComponent } from './delivered-po.component';

describe('DeliveredPoComponent', () => {
  let component: DeliveredPoComponent;
  let fixture: ComponentFixture<DeliveredPoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveredPoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredPoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
