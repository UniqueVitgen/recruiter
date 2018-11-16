import { Skill } from "./skill";
import { CandidateExperience } from "./candidate-experience";
import { ContactDetails } from "./contact-details";
import { Attachment } from "./attachment";

export class Candidate {
  id?: number;
  name: string;
  surname?: string;
  birthday?: string;
  salaryInDollars?: number;
  skills: Skill[];
  experiences: CandidateExperience[];
  contacts: ContactDetails[];
  attachments: Attachment[];
}
