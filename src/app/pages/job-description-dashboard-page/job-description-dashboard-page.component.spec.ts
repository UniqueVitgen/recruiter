import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionDashboardPageComponent } from './job-description-dashboard-page.component';

describe('JobDescriptionDashboardPageComponent', () => {
  let component: JobDescriptionDashboardPageComponent;
  let fixture: ComponentFixture<JobDescriptionDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionDashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
