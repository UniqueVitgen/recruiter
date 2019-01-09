import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortToolbarComponent } from './sort-toolbar.component';

describe('SortToolbarComponent', () => {
  let component: SortToolbarComponent;
  let fixture: ComponentFixture<SortToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
