import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionFilterToolbarComponent } from './job-description-filter-toolbar.component';

describe('JobDescriptionFilterToolbarComponent', () => {
  let component: JobDescriptionFilterToolbarComponent;
  let fixture: ComponentFixture<JobDescriptionFilterToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionFilterToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionFilterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
