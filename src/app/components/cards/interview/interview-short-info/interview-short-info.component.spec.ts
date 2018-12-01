import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewShortInfoComponent } from './interview-short-info.component';

describe('InterviewShortInfoComponent', () => {
  let component: InterviewShortInfoComponent;
  let fixture: ComponentFixture<InterviewShortInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewShortInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
