import {Interview} from '../../../classes/interview';
import {Candidate} from '../../../classes/candidate';

export interface InterviewDialogData {
  sourceDate: Date;
  sourceCandidate: Candidate;
  fixedCandidate: boolean;
  sourceInterview?: Interview;
  isEdit?: boolean;
}
