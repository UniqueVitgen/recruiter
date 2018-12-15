import {VacancyState} from '../enums/vacancy-state.enum';
import {Skill} from './skill';
import {Requirement} from './requirement';
import {Candidate} from './candidate';

export class Vacancy {
  id?: string | number
  ;
  position: string;
  salaryInDollarsFrom?: number;
  salaryInDollarsTo?: number;
  vacancyState: VacancyState;
  experienceYearsRequire: number;
  developerId: number;
  skills: Skill[];
  requirements: Requirement[] = [];
  candidates?: Candidate[] = [];
}
