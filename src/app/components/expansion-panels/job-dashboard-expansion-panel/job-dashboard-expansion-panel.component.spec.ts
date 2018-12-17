import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDashboardExpansionPanelComponent } from './job-dashboard-expansion-panel.component';

describe('JobDashboardExpansionPanelComponent', () => {
  let component: JobDashboardExpansionPanelComponent;
  let fixture: ComponentFixture<JobDashboardExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDashboardExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDashboardExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
