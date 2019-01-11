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
  MatButtonModule,
  MatDividerModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatAutocompleteModule, MatTooltipModule, MatSelectModule, MatRadioModule,
} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {AmazingTimePickerModule} from 'amazing-time-picker';


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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatAutocompleteModule,
    DragDropModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    AmazingTimePickerModule // this line you need
    ,
    NgxMaterialTimepickerModule.forRoot()
    // ,
    // Md2Module
    // ,
    // MatMom
  ],
  declarations: [],
  exports: [
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
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatAutocompleteModule,
    DragDropModule,
    MatTooltipModule,
    MatSelectModule,
    MatRadioModule,
    AmazingTimePickerModule // this line you need
    ,
    NgxMaterialTimepickerModule
    // ,
    // Md2Module
  ]
})
export class MaterialDesignModule { }
