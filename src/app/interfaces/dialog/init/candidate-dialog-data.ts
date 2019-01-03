import {Candidate} from '../../../classes/candidate';
import {Vacancy} from '../../../classes/vacancy';

export interface CandidateDialogData {
  sourceCandidate: Candidate;
  isEdit?: boolean;
  sourceVacancies: Vacancy;
}
