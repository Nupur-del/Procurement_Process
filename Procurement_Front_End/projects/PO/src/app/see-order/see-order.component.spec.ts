import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeOrderComponent } from './see-order.component';

describe('SeeOrderComponent', () => {
  let component: SeeOrderComponent;
  let fixture: ComponentFixture<SeeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
