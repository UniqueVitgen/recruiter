import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AlertDialogData} from '../../../interfaces/dialog/init/alert-dialog-data';
import {AlertWithButtonDialogData} from '../../../interfaces/dialog/init/alert-with-button-dialog-data';

@Component({
  selector: 'app-alert-with-button-modal',
  templateUrl: './alert-with-button-modal.component.html',
  styleUrls: ['./alert-with-button-modal.component.scss']
})
export class AlertWithButtonModalComponent implements OnInit {
  @Output('clickOk') outputClickOk: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<AlertWithButtonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertWithButtonDialogData ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }
  clickOk() {
    this.outputClickOk.emit(true);
  }

}
