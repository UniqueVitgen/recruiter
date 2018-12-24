import {Candidate} from '../../candidate';
import {Vacancy} from '../../vacancy';
import {Interview} from '../../interview';

export class CalendarEvent {
  title: string;
  start: string;
  end: string;
  candidate?: Candidate;
  vacancy: Vacancy;
  interview: Interview;
}