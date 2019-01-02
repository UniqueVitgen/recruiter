import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInterviewModalComponent } from './delete-interview-modal.component';

describe('DeleteInterviewModalComponent', () => {
  let component: DeleteInterviewModalComponent;
  let fixture: ComponentFixture<DeleteInterviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteInterviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInterviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
