import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCandidateTimelineItemComponent } from './note-candidate-timeline-item.component';

describe('NoteCandidateTimelineItemComponent', () => {
  let component: NoteCandidateTimelineItemComponent;
  let fixture: ComponentFixture<NoteCandidateTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCandidateTimelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCandidateTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
