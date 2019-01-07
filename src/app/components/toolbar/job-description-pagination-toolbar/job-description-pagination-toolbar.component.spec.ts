import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionPaginationToolbarComponent } from './job-description-pagination-toolbar.component';

describe('JobDescriptionPaginationToolbarComponent', () => {
  let component: JobDescriptionPaginationToolbarComponent;
  let fixture: ComponentFixture<JobDescriptionPaginationToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionPaginationToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionPaginationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
