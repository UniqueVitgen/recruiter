import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InterviewDialogData} from '../../../interfaces/dialog/init/interview-dialog-data';
import {AlertDialogData} from '../../../interfaces/dialog/init/alert-dialog-data';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlertModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData ) { }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
