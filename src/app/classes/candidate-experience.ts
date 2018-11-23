import {Project} from './project';
import {Team} from './team';

export class CandidateExperience {
  dateFrom: string;
  dateTo: string;
  jobDescription: Project;
  jobPosition: string;
  companyName: Team;
}
