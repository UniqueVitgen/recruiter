import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TimeInput} from '../../classes/html/dateTime/time-input';
import {DateInput} from '../../classes/html/dateTime/date-input';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {DateTimeForm} from '../../classes/html/dateTime/date-time-form';
import {DateTimeInput} from '../../classes/html/dateTime/date-time-input';

@Injectable({
  providedIn: 'root'
})
export class DateTimeWorker {
  public millisecond = 1;
  public second = 1000;
  public minute =  60 * 1000;
  public hour = 60 * 60 * 1000;
  public datePipe: DatePipe;
  constructor(
    @Inject(LOCALE_ID) private locale: string) {
    this.datePipe = new DatePipe(locale);
  }

  getTime(dateWithTime, format?) {
    const date = new Date(dateWithTime);
    if (format == null) {
      format = 'H:mm';
    }
    return this.datePipe.transform(date, format);
  }

  getDate(dateWithTime, format?) {
    if (dateWithTime) {
      // console.log('date - ', dateWithTime);
      const date = new Date(dateWithTime);
      if (format == null) {
        format = 'yyyy-MM-dd';
      }
      return this.datePipe.transform(date, format);
    }
  }

  getDateWithTime(dateWithTime, format?) {
    if (dateWithTime) {
      return this.getDate(dateWithTime, 'dd MMMM yyyy') + ' at ' + this.getTime(dateWithTime);
    }
  }
  parseDateToDateTimeForm(date: Date): DateTimeForm {
    return {
      timeString: this.getTime(date),
      dateDate: new Date(date),
      value: new DateTimeInput()
    };
  }
  parseTimeObject(timeObject: Date) {
    timeObject = new Date(timeObject);
    return <TimeInput> {
      minutes: timeObject.getMinutes(),
      hours: timeObject.getHours()
    };
  }
  parseTimeString(timeString: string): TimeInput {
    const hours = timeString.substr(0, timeString.indexOf(':'));
    const minutes = timeString.substr(timeString.indexOf(':') + 1);
    return {
      hours: parseInt(hours),
      minutes: parseInt(minutes)
    };
  }
  parseDate(date: Date): DateInput {
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  }
}
