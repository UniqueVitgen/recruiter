import {Project} from './project';
import {Team} from './team';
import {EventNote} from './event-note';
import {PositionModel} from './position-model';

export class CandidateExperience  extends EventNote {
  dateFrom: string;
  dateTo: string;
  jobDescription: Project;
  jobPosition: PositionModel = new PositionModel();
  companyName: Team = new Team();
}
