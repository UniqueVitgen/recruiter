import {Candidate} from './candidate';
import {Vacancy} from './vacancy';
import {EventNote} from './event-note';

export class Interview extends EventNote {
  // id?: number;
  candidateId: number;
  vacancyId: number;
  planDate: string;
  factDate?: string;
  comment?: string;
  createdAt?: Date;
}

export class InterviewExtended extends Interview {
  candidate?: Candidate;
  vacancy?: Vacancy;
}
