import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionShortInfoComponent } from './job-description-short-info.component';

describe('JobDescriptionShortInfoComponent', () => {
  let component: JobDescriptionShortInfoComponent;
  let fixture: ComponentFixture<JobDescriptionShortInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionShortInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionShortInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
