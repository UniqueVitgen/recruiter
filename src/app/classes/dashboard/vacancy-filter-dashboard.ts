import {FilterDashboard} from './filter-dashboard';

export class VacancyFilterDashboard extends FilterDashboard {
  minYearRequired: number;
  minYearRequiredOnTheEdge: boolean;
  maxYearRequired: number;
  maxYearRequiredOnTheEdge: boolean;
  minSalary: number;
  minSalaryOnTheEdge: boolean;
  maxSalary: number;
  maxSalaryOnTheEdge: boolean;
}
