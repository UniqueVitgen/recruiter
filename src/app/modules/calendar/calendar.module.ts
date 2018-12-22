import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgendaService, DayService, MonthService, ScheduleModule, WeekService, WorkWeekService} from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    ScheduleModule
  ],
  providers: [
    AgendaService, DayService, WeekService, WorkWeekService, MonthService
  ],
  declarations: [],
  exports: [
    ScheduleModule
  ]
})
export class CalendarModule { }
