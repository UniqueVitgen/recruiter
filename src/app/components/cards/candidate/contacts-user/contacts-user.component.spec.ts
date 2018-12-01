import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsUserComponent } from './contacts-user.component';

describe('ContactsUserComponent', () => {
  let component: ContactsUserComponent;
  let fixture: ComponentFixture<ContactsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
