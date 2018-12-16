import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteCandidateModalComponent } from './note-candidate-modal.component';

describe('NoteCandidateModalComponent', () => {
  let component: NoteCandidateModalComponent;
  let fixture: ComponentFixture<NoteCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
