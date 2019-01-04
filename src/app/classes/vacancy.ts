import {VacancyState} from '../enums/vacancy-state.enum';
import {Skill} from './skill';
import {Requirement, RequirementForm} from './requirement';
import {Candidate} from './candidate';
import {Position} from './position';

export class Vacancy {
  id?: number
  ;
  position: Position = new Position(); // vacancy's name
  salaryInDollarsFrom?: number;
  salaryInDollarsTo?: number;
  vacancyState: VacancyState;
  experienceYearsRequire: number;
  developerId: number;
  skills: Skill[];
  requirements: Requirement[] = [];
  candidates?: Candidate[] = [];
  description: string;

}
export class VacancyForm extends Vacancy {
  requirements: RequirementForm[] = [];
}
