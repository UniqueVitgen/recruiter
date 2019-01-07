import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateFilterToolbarComponent } from './candidate-filter-toolbar.component';

describe('CandidateFilterToolbarComponent', () => {
  let component: CandidateFilterToolbarComponent;
  let fixture: ComponentFixture<CandidateFilterToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateFilterToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateFilterToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
