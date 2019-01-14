import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevFeedbackModalComponent } from './dev-feedback-modal.component';

describe('DevFeedbackModalComponent', () => {
  let component: DevFeedbackModalComponent;
  let fixture: ComponentFixture<DevFeedbackModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevFeedbackModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevFeedbackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
