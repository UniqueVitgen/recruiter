import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-interview-modal',
  templateUrl: './delete-interview-modal.component.html',
  styleUrls: ['./delete-interview-modal.component.scss']
})
export class DeleteInterviewModalComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteInterviewModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }

  ngOnInit() {
  }

  deleteVacancy(choice: boolean): void {
    choice ? this.dialogRef.close(choice) : this.dialogRef.close(choice);
  }

}
