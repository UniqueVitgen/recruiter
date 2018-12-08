import {Candidate} from './candidate';
import {Vacancy} from './vacancy';
import {EventNote} from './event-note';
import {EventNoteType} from '../enums/event-timeline-type.enum';

export class Interview extends EventNote {
  // id?: number;
  candidateId: number;
  vacancyId: number;
  planDate: string;
  factDate?: string;
}

export class InterviewExtended extends Interview {
  candidate?: Candidate;
  vacancy?: Vacancy;
}
