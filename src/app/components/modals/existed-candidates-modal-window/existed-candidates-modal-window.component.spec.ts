import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistedCandidatesModalWindowComponent } from './existed-candidates-modal-window.component';

describe('ExistedCandidatesModalWindowComponent', () => {
  let component: ExistedCandidatesModalWindowComponent;
  let fixture: ComponentFixture<ExistedCandidatesModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistedCandidatesModalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistedCandidatesModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
