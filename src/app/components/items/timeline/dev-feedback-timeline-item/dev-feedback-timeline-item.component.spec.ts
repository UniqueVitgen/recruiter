import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevFeedbackTimelineItemComponent } from './dev-feedback-timeline-item.component';

describe('DevFeedbackTimelineItemComponent', () => {
  let component: DevFeedbackTimelineItemComponent;
  let fixture: ComponentFixture<DevFeedbackTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevFeedbackTimelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevFeedbackTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
