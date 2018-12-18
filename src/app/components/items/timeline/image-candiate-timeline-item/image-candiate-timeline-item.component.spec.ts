import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCandiateTimelineItemComponent } from './image-candiate-timeline-item.component';

describe('ImageCandiateTimelineItemComponent', () => {
  let component: ImageCandiateTimelineItemComponent;
  let fixture: ComponentFixture<ImageCandiateTimelineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageCandiateTimelineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageCandiateTimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
