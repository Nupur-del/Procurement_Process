import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeniedPOComponent } from './denied-po.component';

describe('DeniedPOComponent', () => {
  let component: DeniedPOComponent;
  let fixture: ComponentFixture<DeniedPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeniedPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeniedPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
