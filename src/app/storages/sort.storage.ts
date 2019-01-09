import {Injectable} from '@angular/core';
import {SortDashboard} from '../classes/dashboard/sort-dashboard';
const CANDIDATE_SORT = 'CandiateSortObject';
@Injectable({
  providedIn: 'root'
})
export class SortStorage {
  public getCandidateSort(): SortDashboard {
    const candidateSort = localStorage.getItem(CANDIDATE_SORT);
    if (candidateSort) {
      return JSON.parse(candidateSort);
    }
  }
  public setCandidateSort(sortDashboard: SortDashboard): void {
    localStorage.setItem(CANDIDATE_SORT, JSON.stringify(sortDashboard));
  }
}
