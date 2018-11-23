import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CalendarPageComponent } from './calendar-page.component';

@NgModule({
  declarations: [
    CalendarPageComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [CalendarPageComponent]
})
export class CalendarPageModule { }
