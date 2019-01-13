import {FilterDashboard} from './filter-dashboard';

export class CandidateFilterDashboard extends FilterDashboard{
  minSalary: number;
  minSalaryOnTheEdge: boolean;
  maxSalary: number;
  maxSalaryOnTheEdge: boolean;
  minYearRequired: number;
  minYearRequiredOnTheEdge: boolean;
  maxYearRequired: number;
  maxYearRequiredOnTheEdge: boolean;
  includeUndefinedBirthday: boolean;
  includeUndefinedSalary: boolean;
}
