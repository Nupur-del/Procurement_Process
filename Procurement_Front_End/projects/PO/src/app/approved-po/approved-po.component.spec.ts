import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPOComponent } from './approved-po.component';

describe('ApprovedPOComponent', () => {
  let component: ApprovedPOComponent;
  let fixture: ComponentFixture<ApprovedPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
