import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionRequirementsComponent } from './job-description-requirements.component';

describe('JobDescriptionRequirementsComponent', () => {
  let component: JobDescriptionRequirementsComponent;
  let fixture: ComponentFixture<JobDescriptionRequirementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionRequirementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionRequirementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
