import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MDBBootstrapModule} from 'angular-bootstrap-md';

@NgModule({
  imports: [
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [],
  exports: [
    MDBBootstrapModule
  ]
})
export class AngularBootstrapModule { }
