import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacancyAccordionComponent } from './vacancy-accordion.component';

describe('VacancyAccordionComponent', () => {
  let component: VacancyAccordionComponent;
  let fixture: ComponentFixture<VacancyAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacancyAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
