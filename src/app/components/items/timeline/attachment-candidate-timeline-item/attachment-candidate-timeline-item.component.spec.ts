import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentCandidateTimelineItemComponent } from './attachment-candidate-timeline-item.component';

describe('AttachmentCandidateTimelineItemComponent', () => {
  let component: AttachmentCandidateTimelineItemComponent;
  let fixture: ComponentFixture<AttachmentCandidateTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentCandidateTimelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentCandidateTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
