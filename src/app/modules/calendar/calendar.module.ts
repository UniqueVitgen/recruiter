import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgendaService, DayService, MonthService, ScheduleModule, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';
import { FullCalendarModule } from 'ng-fullcalendar';
// import { Ng } from 'fullcalendar';

@NgModule({
  imports: [
    // ScheduleModule
    FullCalendarModule,
    // NgxFullCalendarModule
  ],
  providers: [
    // AgendaService, DayService, WeekService, WorkWeekService, MonthService
  ],
  declarations: [],
  exports: [
    FullCalendarModule,
    // NgxFullCalendarModule
    // ScheduleModule
  ]
})
export class CalendarModule { }
