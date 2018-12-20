import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteVacancyDialogComponent } from './delete-vacancy-dialog.component';

describe('DeleteVacancyDialogComponent', () => {
  let component: DeleteVacancyDialogComponent;
  let fixture: ComponentFixture<DeleteVacancyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteVacancyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteVacancyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
