import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAttachmentComponent } from './candidate-attachment.component';

describe('CandidateAttachmentComponent', () => {
  let component: CandidateAttachmentComponent;
  let fixture: ComponentFixture<CandidateAttachmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAttachmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
