import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTimepickerComponent } from './custom-timepicker.component';

describe('CustomTimepickerComponent', () => {
  let component: CustomTimepickerComponent;
  let fixture: ComponentFixture<CustomTimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
