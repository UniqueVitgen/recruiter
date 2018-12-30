import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyInterviewExpansionPanelComponent } from './vacancy-interview-expansion-panel.component';

describe('VacancyInterviewExpansionPanelComponent', () => {
  let component: VacancyInterviewExpansionPanelComponent;
  let fixture: ComponentFixture<VacancyInterviewExpansionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyInterviewExpansionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyInterviewExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
