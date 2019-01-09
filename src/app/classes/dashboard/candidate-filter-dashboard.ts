import {FilterDashboard} from './filter-dashboard';

export class CandidateFilterDashboard extends FilterDashboard{
  minSalary: number;
  maxSalary: number;
  minYearRequired: number;
  maxYearRequired: number;
  includeUndefinedBirthday: boolean;
}
