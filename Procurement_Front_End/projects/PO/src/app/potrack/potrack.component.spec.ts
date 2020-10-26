import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { POTrackComponent } from './potrack.component';

describe('POTrackComponent', () => {
  let component: POTrackComponent;
  let fixture: ComponentFixture<POTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ POTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(POTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
