import {Injectable} from '@angular/core';
import {PaginationDashbord} from '../classes/dashboard/pagination-dashbord';
const CANDIDATE_PAGINATION = 'CandidatePaginationObject';
const VACANCY_PAGINATION = 'VacancyPaginationObject';

@Injectable({
  providedIn: 'root'
})
export class PaginationStorage {
  public getCandidatePagination(): PaginationDashbord {
    const candidatePagination = localStorage.getItem(CANDIDATE_PAGINATION);
    if (candidatePagination) {
      return JSON.parse(candidatePagination);
    }
  }
  public setCandidatePagination(paginationDashboard: PaginationDashbord): void {
    localStorage.setItem(CANDIDATE_PAGINATION, JSON.stringify(paginationDashboard));
  }
  public getVacancyPagination(): PaginationDashbord {
    const vacancyPagination = localStorage.getItem(VACANCY_PAGINATION);
    if (vacancyPagination) {
      return JSON.parse(vacancyPagination);
    }
  }
  public setVacancyPagination(paginationDashboard: PaginationDashbord): void {
    localStorage.setItem(VACANCY_PAGINATION, JSON.stringify(paginationDashboard));
  }
}
