import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateTimelineToolbarComponent } from './candidate-timeline-toolbar.component';

describe('CandidateTimelineToolbarComponent', () => {
  let component: CandidateTimelineToolbarComponent;
  let fixture: ComponentFixture<CandidateTimelineToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateTimelineToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateTimelineToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
