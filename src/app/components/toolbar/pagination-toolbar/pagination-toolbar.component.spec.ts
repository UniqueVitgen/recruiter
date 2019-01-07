import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationToolbarComponent } from './pagination-toolbar.component';

describe('PaginationToolbarComponent', () => {
  let component: PaginationToolbarComponent;
  let fixture: ComponentFixture<PaginationToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
