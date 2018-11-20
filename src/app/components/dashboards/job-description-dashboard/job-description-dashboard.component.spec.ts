import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionDashboardComponent } from './job-description-dashboard.component';

describe('JobDescriptionDashboardComponent', () => {
  let component: JobDescriptionDashboardComponent;
  let fixture: ComponentFixture<JobDescriptionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
