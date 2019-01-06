import {Candidate} from './candidate';
import {Vacancy} from './vacancy';
import {EventNote} from './event-note';

export class Interview extends EventNote {
  // id?: number;
  candidateId: number;
  vacancyId: number;
  planDate: string;
  planEndDate: string;
  factDate?: string;
  comment?: string;
}

export class InterviewExtended extends Interview {
  candidate?: Candidate;
  vacancy?: Vacancy;
}
