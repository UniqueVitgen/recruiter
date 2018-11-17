import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionCandidateModalComponent } from './position-candidate-modal.component';

describe('PositionCandidateModalComponent', () => {
  let component: PositionCandidateModalComponent;
  let fixture: ComponentFixture<PositionCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
