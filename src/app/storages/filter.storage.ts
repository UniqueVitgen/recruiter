import {Injectable} from '@angular/core';
import {SortDashboard} from '../classes/dashboard/sort-dashboard';
import {CandidateFilterDashboard} from '../classes/dashboard/candidate-filter-dashboard';

const CANDIDATE_FILTER = 'CandidateFilterObject';
@Injectable({
  providedIn: 'root'
})
export class FilterStorage {
  public getCandidateFilter(): CandidateFilterDashboard {
    const candidateFilter = localStorage.getItem(CANDIDATE_FILTER);
    if (candidateFilter) {
      return JSON.parse(candidateFilter);
    }
  }
  public setCandidateFilter(sortDashboard: CandidateFilterDashboard): void {
    localStorage.setItem(CANDIDATE_FILTER, JSON.stringify(sortDashboard));
  }
}
