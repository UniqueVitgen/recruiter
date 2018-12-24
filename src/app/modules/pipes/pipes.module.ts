import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LocalDatePipe} from '../../pipes/local-date/local-date.pipe';
import {TranslatePipe} from '@ngx-translate/core';

@NgModule({
  imports: [
  ],
  providers: [
    LocalDatePipe,
    TranslatePipe
  ],
  declarations: []
})
export class PipesModule { }
