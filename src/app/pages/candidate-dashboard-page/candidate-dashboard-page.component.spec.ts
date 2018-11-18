import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDashboardPageComponent } from './candidate-dashboard-page.component';

describe('CandidateDashboardPageComponent', () => {
  let component: CandidateDashboardPageComponent;
  let fixture: ComponentFixture<CandidateDashboardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDashboardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
