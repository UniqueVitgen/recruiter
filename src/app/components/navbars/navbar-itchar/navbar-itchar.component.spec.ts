import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarItcharComponent } from './navbar-itchar.component';

describe('NavbarItcharComponent', () => {
  let component: NavbarItcharComponent;
  let fixture: ComponentFixture<NavbarItcharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarItcharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarItcharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
