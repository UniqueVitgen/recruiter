import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatProgressSpinnerModule,
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatGridListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule, MatDividerModule, MatCheckboxModule
} from '@angular/material';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule
  ],
  declarations: [],
  exports:[
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule
  ]
})
export class MaterialDesignModule { }
