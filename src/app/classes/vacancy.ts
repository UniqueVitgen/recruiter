import {VacancyState} from '../enums/vacancy-state.enum';
import {Skill} from './skill';
import {Requirement, RequirementForm} from './requirement';
import {Candidate} from './candidate';
import {PositionModel} from './position-model';

export class Vacancy {
  id?: number
  ;
  position: PositionModel = new PositionModel(); // vacancy's name
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
