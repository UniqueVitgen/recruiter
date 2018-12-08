import {Project} from './project';
import {Team} from './team';
import {EventNote} from './event-note';
import {EventNoteType} from '../enums/event-timeline-type.enum';

export class CandidateExperience  extends EventNote {
  dateFrom: string;
  dateTo: string;
  jobDescription: Project;
  jobPosition: string;
  companyName: Team;
}
