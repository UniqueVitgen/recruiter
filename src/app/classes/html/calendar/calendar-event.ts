import {Candidate} from '../../candidate';
import {Vacancy} from '../../vacancy';
import {Interview} from '../../interview';

export class CalendarEvent {
  title: string;
  start: string;
  end: string;
  color?: string;
  textColor?: string;
  candidate?: Candidate;
  vacancy: Vacancy;
  interview: Interview;
  editable?: boolean;
  droppable?: boolean;
}
