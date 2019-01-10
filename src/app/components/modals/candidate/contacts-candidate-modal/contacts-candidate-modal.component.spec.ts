import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsCandidateModalComponent } from './contacts-candidate-modal.component';

describe('ContactsCandidateModalComponent', () => {
  let component: ContactsCandidateModalComponent;
  let fixture: ComponentFixture<ContactsCandidateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsCandidateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsCandidateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
