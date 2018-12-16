import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceCandidateModalComponent } from './experience-candidate-modal.component';

describe('ExperienceCandidateModalComponent', () => {
  let component: ExperienceCandidateModalComponent;
  let fixture: ComponentFixture<ExperienceCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
