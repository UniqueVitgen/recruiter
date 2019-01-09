import {Injectable} from '@angular/core';
import {SortDashboard} from '../classes/dashboard/sort-dashboard';
import {CandidateFilterDashboard} from '../classes/dashboard/candidate-filter-dashboard';
import {VacancyFilterDashboard} from '../classes/dashboard/vacancy-filter-dashboard';

const CANDIDATE_FILTER = 'CandidateFilterObject';
const VACANCY_FILTER = 'VacancyFilterObject';
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
  public getVacancyFilter(): VacancyFilterDashboard {
    const vacancyFilter = localStorage.getItem(VACANCY_FILTER);
    if (vacancyFilter) {
      return JSON.parse(vacancyFilter);
    }
  }
  public setVacancyFilter(vacancyFilter: VacancyFilterDashboard): void {
    localStorage.setItem(VACANCY_FILTER, JSON.stringify(vacancyFilter));
  }
}
