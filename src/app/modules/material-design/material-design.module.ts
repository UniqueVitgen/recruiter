import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule, MatIconModule, MatCardModule, MatGridListModule } from '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule
  ],
  declarations: [],
  exports:[
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatGridListModule
  ]
})
export class MaterialDesignModule { }
