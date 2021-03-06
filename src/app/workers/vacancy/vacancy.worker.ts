import {Injectable} from '@angular/core';

import {Vacancy} from '../../classes/vacancy';
import {VacancyStateEnumWorker} from '../enum/vacancy-state-enum.worker';
import {SortDirection} from '../../enums/sort-direction.enum';

@Injectable({
  providedIn: 'root'
})
export class VacancyWorker {
  constructor(private vacancyStateEnumWorker: VacancyStateEnumWorker) {
  }
  sortByPosition(value: Vacancy, value2: Vacancy): number {
    const position = value.position.name.toLowerCase();
    const position2 = value2.position.name.toLowerCase();
    if (position && position2) {
      if (position < position2) { return -1; }
      if (position > position2) { return 1; }
      return 0;
    } else {
      return this.sortByNull(position, position2);
    }
  }
  sortByNull<T>(value: T, value2: T): number {
    if (value && value2) {
      return 0;
    } else if (value) {
      return 1;
    } else if (value2) {
      return -1;
    } else {
      return 0;
    }
  }
  sortBySalaryInDollarsFrom(value: Vacancy, value2: Vacancy): number {
    if (value.salaryInDollarsFrom != null && value2.salaryInDollarsFrom != null) {
      return value.salaryInDollarsFrom - value2.salaryInDollarsFrom;
    } else {
      return this.sortByNull(value.salaryInDollarsFrom, value2.salaryInDollarsFrom);
    }
  }
  sortBySalaryInDollarsTo(value: Vacancy, value2: Vacancy): number {
    if (value.salaryInDollarsTo != null && value2.salaryInDollarsTo != null) {
      return value.salaryInDollarsTo - value2.salaryInDollarsTo;
    } else {
      return this.sortByNull(value.salaryInDollarsTo, value2.salaryInDollarsTo);
    }
  }
  sortByVacancyState(value: Vacancy, value2: Vacancy): number {
    if (value.vacancyState && value2.vacancyState) {
      return this.vacancyStateEnumWorker.getValue(<any>value.vacancyState)
        - this.vacancyStateEnumWorker.getValue(<any>value2.vacancyState);
    } else {
      return this.sortByNull(value.vacancyState, value2.vacancyState);
    }
  }
  sortByExperienceYearsRequire(value: Vacancy, value2: Vacancy): number {
    if (value.experienceYearsRequire != null && value2.experienceYearsRequire != null) {
      return value.experienceYearsRequire - value2.experienceYearsRequire;
    } else {
      return this.sortByNull(value, value2);
    }
  }
  sortByCandidates(value: Vacancy, value2: Vacancy): number {
    if (value.candidates.length != null && value2.candidates.length != null) {
      return value.candidates.length - value2.candidates.length;
    } else {
      return this.sortByNull(value, value2);
    }
  }

  sortByProperty(vacancies: Vacancy[], property: string, direction: number): Vacancy[] {
    const vacanciesNonUndefined = vacancies.filter(vacancy => {
      return vacancy[property] != null;
    });
    const vacanciesUndefined = vacancies.filter(vacancy => {
      return vacancy[property] == null;
    });
    const vacanciesNonUndefinedSorted =  vacanciesNonUndefined.sort((value, value2) => {
      if (property === 'position') {
        return this.sortByPosition(value, value2) * direction;
      } else if (property === 'vacancyState') {
        return this.sortByVacancyState(value, value2) * direction;
      } else if (property === 'salaryInDollarsFrom') {
        return this.sortBySalaryInDollarsFrom(value, value2) * direction;
      } else if (property === 'salaryInDollarsTo') {
        return this.sortBySalaryInDollarsTo(value, value2) * direction;
      } else if (property === 'experienceYearsRequire') {
        console.log('experienceYearsRequire', value.experienceYearsRequire, value2.experienceYearsRequire);
        return this.sortByExperienceYearsRequire(value, value2) * direction;
      } else if (property === 'candidates') {
        return this.sortByCandidates(value, value2) * direction;
      }
    });
    return vacanciesNonUndefinedSorted.concat(vacanciesUndefined);
  }
}
