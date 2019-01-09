import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullCalendarModule} from 'primeng/fullcalendar';
// import {AutoCompleteModule} from 'primeng/primeng';

@NgModule({
  imports: [
    FullCalendarModule
    // ,
    // AutoCompleteModule
  ],
  declarations: [],
  exports: [
    FullCalendarModule
    // ,
    // AutoCompleteModule
  ]
})
export class PrimeNGModule { }
