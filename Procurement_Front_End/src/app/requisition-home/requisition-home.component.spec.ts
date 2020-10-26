import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionHomeComponent } from './requisition-home.component';

describe('RequisitionHomeComponent', () => {
  let component: RequisitionHomeComponent;
  let fixture: ComponentFixture<RequisitionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
