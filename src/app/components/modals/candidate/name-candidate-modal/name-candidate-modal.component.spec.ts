import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCandidateModalComponent } from './name-candidate-modal.component';

describe('NameCandidateModalComponent', () => {
  let component: NameCandidateModalComponent;
  let fixture: ComponentFixture<NameCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NameCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NameCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
