import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DatePipe} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateTimeWorker {
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
  parseTimeString(timeString: string): {hours: number, minutes: number} {
    const hours = timeString.substr(0, timeString.indexOf(':'));
    const minutes = timeString.substr(timeString.indexOf(':') + 1);
    return {
      hours: parseInt(hours),
      minutes: parseInt(minutes)
    };
  }
  parseDate(date: Date): {day: number, month: number, year: number} {
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    };
  }
}
