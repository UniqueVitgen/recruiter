import { Injectable } from '@angular/core';
import {Candidate, CandidateDashboardItem} from '../../classes/candidate';
import {DateTimeWorker} from '../date-time/date-time.worker';
import {CandidateStateEnumWorker} from '../enum/candidate-state-enum.worker';
import {SortDirection} from '../../enums/sort-direction.enum';

@Injectable({
  providedIn: 'root'
})
export class UserWorker {
  constructor(private dateTimeWorker: DateTimeWorker,
              private candidateStateEnumWorker: CandidateStateEnumWorker) {
  }
  config = {
    minRequiredYear: 18,
    maxRequiredYear: 50
  };
  formatFullName(candidate: Candidate) {
    return candidate.surname +  ' ' + candidate.name;
  }
  generateRequiredEndDate() {
    const now = new Date();
    now.setFullYear(now.getFullYear() - this.config.minRequiredYear);
    return now;
  }
  generateRequiredStartDate() {
    const now = new Date();
    now.setFullYear(now.getFullYear() - this.config.maxRequiredYear);
    return now;
  }
  sortByFullname(value: Candidate, value2: Candidate): number {
    const fullname = this.formatFullName(value).toLowerCase();
    const fullname2 = this.formatFullName(value2).toLowerCase();
    if (fullname && fullname2) {
      if (fullname < fullname2) { return -1; }
      if (fullname > fullname2) { return 1; }
      return 0;
    } else {
      return this.sortByNull(fullname, fullname2);
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
  sortByAge(value: Candidate, value2: Candidate): number {
    const birthday = value.birthday;
    const birthday2 = value2.birthday;
    // const age = this.dateTimeWorker.calculateAge(new Date(value.birthday));
    // const age2 = this.dateTimeWorker.calculateAge(new Date(value2.birthday));
    if (birthday && birthday2) {
      if (birthday < birthday2) {
        return 1;
      } else if (birthday > birthday2) {
        return -1;
      } else {
        return 0;
      }
    } else {
      return this.sortByNull(birthday, birthday2);
    }
  }
  sortBySalaryInDollars(value: Candidate, value2: Candidate): number {
    if (value.salaryInDollars && value2.salaryInDollars) {
      return value.salaryInDollars - value2.salaryInDollars;
    } else {
      return this.sortByNull(value.salaryInDollars, value2.salaryInDollars);
    }
  }
  sortByCandidateState(value: Candidate, value2: Candidate): number {
    if (value.candidateState.name && value2.candidateState.name) {
      return this.candidateStateEnumWorker.getValue(<any>value.candidateState.name)
      - this.candidateStateEnumWorker.getValue(<any>value2.candidateState.name);
    } else {
      return this.sortByNull(value.candidateState.name, value2.candidateState.name);
    }
  }
  sortByProperty(candidates: CandidateDashboardItem[], property: string, direction: number): CandidateDashboardItem[] {
    const candidatesNonUndefined = candidates.filter(candidate => {
      if (property === 'age') {
        return candidate.birthday != null;
      } else if (property === 'fullname') {
        return this.formatFullName(candidate) != null;
      } else {
        return candidate[property] != null;
      }
      return candidate[property] != null;
    });
    const candidatesUndefined = candidates.filter(candidate => {
      if (property === 'age') {
        return candidate.birthday == null;
      } else if (property === 'fullname') {
        return this.formatFullName(candidate) == null;
      } else {
        return candidate[property] == null;
      }
      return candidate[property] == null;
    });
    const candidatesNonUndefinedSorted = candidates.sort((value, value2) => {
      if (property === 'fullname') {
        return this.sortByFullname(value, value2) * direction;
      } else if (property === 'age') {
        return this.sortByAge(value, value2) * direction;
      } else if (property === 'salaryInDollars') {
        return this.sortBySalaryInDollars(value, value2) * direction;
      } else if (property === 'candidateState') {
        return this.sortByCandidateState(value, value2) * direction;
      }
    });
    return candidatesNonUndefinedSorted.concat(candidatesUndefined);
  }
}
