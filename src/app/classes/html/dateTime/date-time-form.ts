import {DateTimeInput} from './date-time-input';
import {TimeInput} from './time-input';

export class DateTimeForm {
  value: DateTimeInput;
  endValue: DateTimeInput;
  time: TimeInput;
  timeString?: string;
  endTime: TimeInput;
  endTimeString?: string;
  dateDate: Date;
}
