import {Interview} from '../../../classes/interview';
import {Candidate} from '../../../classes/candidate';

export interface InterviewDialogData {
  sourceCandidate: Candidate;
  fixedCandidate: boolean;
  sourceInterview?: Interview;
  isEdit?: boolean;
}
