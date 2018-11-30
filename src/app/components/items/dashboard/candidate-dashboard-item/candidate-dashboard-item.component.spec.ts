import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateDashboardItemComponent } from './candidate-dashboard-item.component';

describe('CandidateDashboardItemComponent', () => {
  let component: CandidateDashboardItemComponent;
  let fixture: ComponentFixture<CandidateDashboardItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateDashboardItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
