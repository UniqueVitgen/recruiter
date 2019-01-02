import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertWithButtonModalComponent } from './alert-with-button-modal.component';

describe('AlertWithButtonModalComponent', () => {
  let component: AlertWithButtonModalComponent;
  let fixture: ComponentFixture<AlertWithButtonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertWithButtonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertWithButtonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
