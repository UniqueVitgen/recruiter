import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceUserComponent } from './experience-user.component';

describe('ExperienceUserComponent', () => {
  let component: ExperienceUserComponent;
  let fixture: ComponentFixture<ExperienceUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
