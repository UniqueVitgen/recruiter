import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsSelectComponent } from './positions-select.component';

describe('PositionsSelectComponent', () => {
  let component: PositionsSelectComponent;
  let fixture: ComponentFixture<PositionsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
