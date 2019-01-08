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
  public millisecond;
  public second;
  public minute;
  public hour;
  public day;
  public year;
  public datePipe: DatePipe;
  public config = {
    minTime: '08:00',
    maxTime: '22:00'
  };
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private localDatePipe: LocalDatePipe,
    private translateWorker: TranslateWorker) {
    this.datePipe = new DatePipe(locale);
    this.millisecond = 1;
    this.second = this.millisecond * 1000;
    this.minute = this.second * 60;
    this.hour = this.minute * 60;
    this.day = this.hour * 24;
  }
  calculateAge(birthday: Date) { // birthday is a date
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  getTime(dateWithTime, format?) {
    const date = new Date(dateWithTime);
    if (format == null) {
      format = 'H:mm';
    }
    return this.datePipe.transform(date, format, 'UTC', this.translateWorker.getLanguage());
  }
  getTime2(dateWithTime) {
    const date = new Date(dateWithTime);
    const time = this.parseTimeObject(date);
    return this.convertTimeInputToTimeString(time, 12);
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
      return this.localDatePipe.transform(dateWithTime, 'mediumDate') + ' ' + this.translateWorker.translateWord('at')
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
  getNow() {
    return new Date();
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
  parseDateToDateTimeForm(date: Date, endDate: Date): DateTimeForm {
    return {
      time: this.parseTimeObject(date),
      endTime: this.parseTimeObject(endDate),
      dateDate: new Date(date),
      value: new DateTimeInput(),
      endValue: new DateTimeInput()
    };
  }
  parseTimeObject(timeObject: Date) {
    timeObject = new Date(timeObject);
    return <TimeInput> {
      minutes: timeObject.getMinutes(),
      hours: timeObject.getHours()
    };
  }
  convertTimeInputToTimeString(timeInput: TimeInput, format: number): string {
    let time = this.transformTimeComponent(timeInput.hours) + ':' + this.transformTimeComponent(timeInput.minutes);
    if (format === 12) {
      time = this.parse24FormatToAmPmFormat(time);
    }
    return time;
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
    if (hours && minutes) {
      return {
        hours: parseInt(hours),
        minutes: parseInt(minutes)
      };
    }
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
  setUTCDate(year, month, day, hours, minutes): Date {
    const date = new Date();
    date.setUTCFullYear(year, month, day);
    date.setUTCHours(hours, minutes);
    return date;
  }
  setDate(year, month, day, hours, minutes): Date {
    const date = new Date();
    date.setFullYear(year, month, day);
    date.setHours(hours, minutes);
    return date;
  }
  setDateFromDateTimeInput(dateTimeInput: DateTimeInput) {
    return new Date(dateTimeInput.year,
      dateTimeInput.month, dateTimeInput.day,
      dateTimeInput.hours, dateTimeInput.minutes);
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
  transformTimeComponent(num: number) {
    return num < 10 ? '0' + num : num;
  }
}
