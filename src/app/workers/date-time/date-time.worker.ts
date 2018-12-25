import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TimeInput} from '../../classes/html/dateTime/time-input';
import {DateInput} from '../../classes/html/dateTime/date-input';
import * as moment from 'moment';
import _date = moment.unitOfTime._date;
import {DateTimeForm} from '../../classes/html/dateTime/date-time-form';
import {DateTimeInput} from '../../classes/html/dateTime/date-time-input';
import {TranslateWorker} from '../translate/translate.worker';
import {LocalDatePipe} from '../../pipes/local-date/local-date.pipe';

@Injectable({
  providedIn: 'root'
})
export class DateTimeWorker {
  public millisecond = 1;
  public second = 1000;
  public minute =  60 * 1000;
  public hour = 60 * 60 * 1000;
  public datePipe: DatePipe;
  public config = {
    minTime: '08:00',
    maxTime: '23:00'
  };
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private localDatePipe: LocalDatePipe,
    private translateWorker: TranslateWorker) {
    this.datePipe = new DatePipe(locale);
  }

  getTime(dateWithTime, format?) {
    const date = new Date(dateWithTime);
    if (format == null) {
      format = 'H:mm';
    }
    return this.datePipe.transform(date, format, 'UTC', this.translateWorker.getLanguage());
  }

  getDate(dateWithTime, format?) {
    if (dateWithTime) {
      // console.log('date - ', dateWithTime);
      const date = new Date(dateWithTime);
      if (format == null) {
        format = 'yyyy-MM-dd';
      }
      return this.datePipe.transform(date, format, 'UTC', this.translateWorker.getLanguage());
    }
  }

  getDateWithTime(dateWithTime: Date, format?: string ) {
    if (dateWithTime) {
      return this.localDatePipe.transform(dateWithTime, null) + ' ' + this.translateWorker.translateWord('at')
        + ' ' + this.localDatePipe.transform(dateWithTime, 'shortTime');
    }
  }
  getYesterday() {
    const date = new Date();


    date.setDate(date.getDate() - 1);

    return date;
  }
  getTodayStart() {
    const date = new Date();
    date.setHours(0, 0, 0);
    return date;
  }
  getTodayEnd() {
    const date = new Date();
    date.setHours(23, 59, 59);
    return date;
  }
  isToday(date: Date): boolean {
    return date.getTime() > this.getTodayStart().getTime() && date.getTime() < this.getTodayEnd().getTime();
  }
  getTommorow() {
    const date = new Date();


    date.setDate(date.getDate() + 1);

    return date;
  }
  getNextYear() {
    const date = new Date();


    date.setFullYear(date.getFullYear() + 1);

    return date;
  }
  parseDateToDateTimeForm(date: Date): DateTimeForm {
    return {
      time: this.getTime(date),
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
    const isAm = timeString.indexOf('am') > -1;
    const isPm = timeString.indexOf('pm') > -1;
    let hours;
    if (isPm) {
      hours = parseInt(timeString.substr(0, timeString.indexOf(':'))) + 12;
    } else {
      hours = timeString.substr(0, timeString.indexOf(':'));
    }
    const minutes = timeString.substr(timeString.indexOf(':') + 1);
    return {
      hours: parseInt(hours),
      minutes: parseInt(minutes)
    };
  }
  parse24FormatToAmPmFormat(time24String: string) {
    let hours = parseInt(time24String.substr(0, time24String.indexOf(':')));
    const minutes = parseInt(time24String.substr(time24String.indexOf(':') + 1));
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursString = hours < 10 ? '0' + hours : hours;
    const minutesString = minutes < 10 ? '0' + minutes : minutes;
    const strTime = hoursString + ':' + minutesString + ' ' + ampm;
    return strTime;
  }
  parse12FormatTo24Format(time12String: string) {
    const date = new Date('2000-01-01 ' + time12String);
    return this.datePipe.transform(date, 'HH:mm');
  }
  setUTCDate(year, month, day, hours, minutes) {
    const date = new Date();
    date.setUTCFullYear(year, month, day);
    date.setUTCHours(hours, minutes);
    return date;
  }
  parseDate(date: Date): DateInput {
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  }
  transform(value: any, format: string, timezone: string, locale: string) {
    return this.datePipe.transform(value, format, timezone, locale);
  }
}
