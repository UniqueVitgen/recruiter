import { Injectable } from '@angular/core';
import {Candidate} from '../../classes/candidate';

@Injectable({
  providedIn: 'root'
})
export class UserWorker {
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
}
