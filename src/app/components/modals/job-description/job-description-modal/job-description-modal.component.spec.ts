import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDescriptionModalComponent } from './job-description-modal.component';

describe('JobDescriptionModalComponent', () => {
  let component: JobDescriptionModalComponent;
  let fixture: ComponentFixture<JobDescriptionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDescriptionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDescriptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
