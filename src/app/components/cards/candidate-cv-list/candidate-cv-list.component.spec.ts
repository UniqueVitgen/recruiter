import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCvListComponent } from './candidate-cv-list.component';

describe('CandidateCvListComponent', () => {
  let component: CandidateCvListComponent;
  let fixture: ComponentFixture<CandidateCvListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateCvListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateCvListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
