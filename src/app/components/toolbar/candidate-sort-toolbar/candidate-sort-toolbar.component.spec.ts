import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateSortToolbarComponent } from './candidate-sort-toolbar.component';

describe('CandidateSortToolbarComponent', () => {
  let component: CandidateSortToolbarComponent;
  let fixture: ComponentFixture<CandidateSortToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateSortToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateSortToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
