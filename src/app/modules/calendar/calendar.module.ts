import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgendaService, DayService, MonthService, ScheduleModule, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  imports: [
    // ScheduleModule
    FullCalendarModule
  ],
  providers: [
    // AgendaService, DayService, WeekService, WorkWeekService, MonthService
  ],
  declarations: [],
  exports: [
    FullCalendarModule
    // ScheduleModule
  ]
})
export class CalendarModule { }
