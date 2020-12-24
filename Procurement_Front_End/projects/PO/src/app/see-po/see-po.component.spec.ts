import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeePOComponent } from './see-po.component';

describe('SeePOComponent', () => {
  let component: SeePOComponent;
  let fixture: ComponentFixture<SeePOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeePOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeePOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
