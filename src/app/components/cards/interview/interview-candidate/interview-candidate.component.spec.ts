import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewCandidateComponent } from './interview-candidate.component';

describe('InterviewCandidateComponent', () => {
  let component: InterviewCandidateComponent;
  let fixture: ComponentFixture<InterviewCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterviewCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
