import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCandidateModalComponent } from './delete-candidate-modal.component';

describe('DeleteCandidateModalComponent', () => {
  let component: DeleteCandidateModalComponent;
  let fixture: ComponentFixture<DeleteCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
