import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCandidateModalComponent } from './status-candidate-modal.component';

describe('StatusCandidateModalComponent', () => {
  let component: StatusCandidateModalComponent;
  let fixture: ComponentFixture<StatusCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
