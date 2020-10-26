import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPOComponent } from './check-po.component';

describe('CheckPOComponent', () => {
  let component: CheckPOComponent;
  let fixture: ComponentFixture<CheckPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
