import {CandidateExperience} from '../../../classes/candidate-experience';
import {DevFeedback} from '../../../classes/dev-feedback';
import {Candidate} from '../../../classes/candidate';

export class DevFeedbackDialogData {
  sourceCandidate: Candidate;
  sourceDevFeedback?: DevFeedback;
  isEdit?: boolean;
}
