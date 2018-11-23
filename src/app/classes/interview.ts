import {Candidate} from './candidate';
import {Vacancy} from './vacancy';

export class Interview {
  id?: number;
  candidateId: number;
  vacancyId: number;
  planDate: string;
  factDate?: string;
}

export class InterviewExtended extends Interview {
  candidate?: Candidate;
  vacancy?: Vacancy;
}
