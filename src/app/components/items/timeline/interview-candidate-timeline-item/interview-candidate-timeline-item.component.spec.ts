import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCandidateTimelineItemComponent } from './interview-candidate-timeline-item.component';

describe('InterviewCandidateTimelineItemComponent', () => {
  let component: InterviewCandidateTimelineItemComponent;
  let fixture: ComponentFixture<InterviewCandidateTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewCandidateTimelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewCandidateTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
