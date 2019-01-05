import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionInputComponent } from './position-input.component';

describe('PositionInputComponent', () => {
  let component: PositionInputComponent;
  let fixture: ComponentFixture<PositionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
