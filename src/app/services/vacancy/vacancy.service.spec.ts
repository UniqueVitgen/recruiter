import { TestBed, inject } from '@angular/core/testing';

import { VacancyService } from './vacancy.service';

describe('VacancyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VacancyService]
    });
  });

  it('should be created', inject([VacancyService], (service: VacancyService) => {
    expect(service).toBeTruthy();
  }));
});
