import {Candidate} from '../../../classes/candidate';

export interface CandidateDialogResult {
  success: boolean;
  isEdit: boolean;
  resCandidate: Candidate;
}
