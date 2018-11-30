import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCandidateTimelineItemComponent } from './experience-candidate-timeline-item.component';

describe('ExperienceCandidateTimelineItemComponent', () => {
  let component: ExperienceCandidateTimelineItemComponent;
  let fixture: ComponentFixture<ExperienceCandidateTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceCandidateTimelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceCandidateTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
