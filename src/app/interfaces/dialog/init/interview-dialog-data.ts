import {Interview} from '../../../classes/interview';
import {Candidate} from '../../../classes/candidate';

export interface InterviewDialogData {
  sourceCandidate: Candidate;
  sourceInterview?: Interview;
  isEdit?: boolean;
}
