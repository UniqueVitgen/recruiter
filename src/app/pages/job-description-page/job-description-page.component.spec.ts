import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionPageComponent } from './job-description-page.component';

describe('JobDescriptionPageComponent', () => {
  let component: JobDescriptionPageComponent;
  let fixture: ComponentFixture<JobDescriptionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
