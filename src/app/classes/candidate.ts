import { Skill } from './skill';
import { CandidateExperience } from './candidate-experience';
import { ContactDetails } from './contact-details';
import { Attachment } from './attachment';
import { CandidateState } from './candidate-state';
import {Responsibility} from './responsibility';
import {PositionModel} from './position-model';

export class Candidate {
  id?: number;
  name: string;
  surname?: string;
  birthday?: string;
  salaryInDollars?: number;
  candidateState?: CandidateState;
  skills?: Skill[];
  experiences?: CandidateExperience[];
  contacts?: ContactDetails[];
  attachments?: Attachment[];
  responsibilities?: Responsibility[];
  timelines?: any[];
  position?: PositionModel = new PositionModel();
}
export class CandidateSelected extends Candidate {
  select: boolean;
}
