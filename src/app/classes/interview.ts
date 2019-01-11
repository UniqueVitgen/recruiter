import {Candidate} from './candidate';
import {Vacancy} from './vacancy';
import {EventNote} from './event-note';
import {Interviewer} from './interviewer';

export class Interview extends EventNote {
  // id?: number;
  candidateId: number;
  vacancyId: number;
  planDate: string;
  planEndDate: string;
  completed: boolean;
  comment?: string;
  interviewers: Interviewer;
}

export class InterviewExtended extends Interview {
  candidate?: Candidate;
  vacancy?: Vacancy;
}
