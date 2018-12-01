import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewFeedbackComponent } from './interview-feedback.component';

describe('InterviewFeedbackComponent', () => {
  let component: InterviewFeedbackComponent;
  let fixture: ComponentFixture<InterviewFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
