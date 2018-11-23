import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-root',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.scss']
})
export class CalendarPageComponent implements OnInit {
  @Input() daysArray;
  title = 'my-calendar';
  date = moment();
  ngOnInit() {
  }
 createCalendar(month) {
    const firstDay = moment(month).startOf('M');
    const days = Array.apply(null, {length: month.daysInMonth()})
      .map(Number.call, Number)
      .map(n => {
        return {
          day: moment(firstDay).add(n, 'd').format('DD'),
          interviews: ['14:00-16:00 - Bobo']
      };
      });
    return days;
  }
  prevMonth() {
    this.date = this.date.add(-1, 'month');
    this.daysArray = this.createCalendar(this.date);
  }
  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.daysArray = this.createCalendar(this.date);
  }
}
