import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePOComponent } from './create-po.component';

describe('CreatePOComponent', () => {
  let component: CreatePOComponent;
  let fixture: ComponentFixture<CreatePOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
