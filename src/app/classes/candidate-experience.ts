import {Project} from './project';
import {Team} from './team';
import {EventNote} from './event-note';
import {Position} from './position';

export class CandidateExperience  extends EventNote {
  dateFrom: string;
  dateTo: string;
  jobDescription: Project;
  jobPosition: Position = new Position();
  companyName: Team = new Team();
}
