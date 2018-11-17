import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAvatarComponent } from './candidate-avatar.component';

describe('CandidateAvatarComponent', () => {
  let component: CandidateAvatarComponent;
  let fixture: ComponentFixture<CandidateAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
