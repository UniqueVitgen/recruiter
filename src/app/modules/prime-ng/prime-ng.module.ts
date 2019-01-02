import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {SidebarModule} from 'primeng/primeng';

@NgModule({
  imports: [
    FullCalendarModule
    // ,
    // SidebarModule
  ],
  declarations: [],
  exports: [
    FullCalendarModule
    // ,
    // SidebarModule
  ]
})
export class PrimeNGModule { }
