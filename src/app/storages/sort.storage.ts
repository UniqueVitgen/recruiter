import {Injectable} from '@angular/core';
import {SortDashboard} from '../classes/dashboard/sort-dashboard';
const CANDIDATE_SORT = 'CandiateSortObject';
const VACANCY_SORT = 'VacancySortObject';
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
  public getVacancySort(): SortDashboard {
    const vacancySort = localStorage.getItem(VACANCY_SORT);
    if (vacancySort) {
      return JSON.parse(vacancySort);
    }
  }
  public setVacancySort(sortDashboard: SortDashboard): void {
    localStorage.setItem(VACANCY_SORT, JSON.stringify(sortDashboard));
  }
}
