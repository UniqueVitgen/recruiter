import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionDashboardItemComponent } from './job-description-dashboard-item.component';

describe('JobDescriptionDashboardItemComponent', () => {
  let component: JobDescriptionDashboardItemComponent;
  let fixture: ComponentFixture<JobDescriptionDashboardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionDashboardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
