import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPOComponent } from './pending-po.component';

describe('PendingPOComponent', () => {
  let component: PendingPOComponent;
  let fixture: ComponentFixture<PendingPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
