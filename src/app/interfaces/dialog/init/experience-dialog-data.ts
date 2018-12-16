import {Attachment} from '../../../classes/attachment';
import {Candidate} from '../../../classes/candidate';
import {CandidateExperience} from '../../../classes/candidate-experience';


export interface ExperienceDialogData {
  sourceCandidate: Candidate;
  sourceExperience?: CandidateExperience;
  isEdit?: boolean;
}
