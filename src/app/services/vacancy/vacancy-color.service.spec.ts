import { TestBed, inject } from '@angular/core/testing';

import { VacancyColorService } from './vacancy-color.service';

describe('VacancyColorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacancyColorService]
    });
  });

  it('should be created', inject([VacancyColorService], (service: VacancyColorService) => {
    expect(service).toBeTruthy();
  }));
});
