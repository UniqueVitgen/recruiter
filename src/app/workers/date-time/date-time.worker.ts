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
}
