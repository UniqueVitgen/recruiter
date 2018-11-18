import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentCandidateModalComponent } from './attachment-candidate-modal.component';

describe('AttachmentCandidateModalComponent', () => {
  let component: AttachmentCandidateModalComponent;
  let fixture: ComponentFixture<AttachmentCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachmentCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
