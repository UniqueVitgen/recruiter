import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortInfoUserComponent } from './short-info-user.component';

describe('ShortInfoUserComponent', () => {
  let component: ShortInfoUserComponent;
  let fixture: ComponentFixture<ShortInfoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortInfoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
