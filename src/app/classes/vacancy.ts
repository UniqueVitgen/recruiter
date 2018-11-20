import {VacancyState} from '../enums/vacancy-state.enum';
import {Skill} from './skill';

export class Vacancy {
  id?: number;
  position: string;
  salaryInDollarsFrom?: number;
  salaryInDollarsTo?: number;
  vacancyState: VacancyState;
  experienceYearsRequired: number;
  developerId: number;
  skills: Skill[];
}
