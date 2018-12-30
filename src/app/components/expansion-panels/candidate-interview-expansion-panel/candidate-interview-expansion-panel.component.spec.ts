import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateInterviewExpansionPanelComponent } from './candidate-interview-expansion-panel.component';

describe('CandidateInterviewExpansionPanelComponent', () => {
  let component: CandidateInterviewExpansionPanelComponent;
  let fixture: ComponentFixture<CandidateInterviewExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateInterviewExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateInterviewExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
