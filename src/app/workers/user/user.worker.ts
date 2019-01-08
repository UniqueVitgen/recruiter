import { Injectable } from '@angular/core';
import {Candidate} from '../../classes/candidate';
import {DateTimeWorker} from '../date-time/date-time.worker';
import {CandidateStateEnumWorker} from '../enum/candidate-state-enum.worker';

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
    const fullname = this.formatFullName(value);
    const fullname2 = this.formatFullName(value2);
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
    const age = this.dateTimeWorker.calculateAge(new Date(value.birthday));
    const age2 = this.dateTimeWorker.calculateAge(new Date(value2.birthday));
    if (age && age2) {
      return age - age2;
    } else {
      return this.sortByNull(age, age2);
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
}
