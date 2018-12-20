import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-vacancy-dialog',
  templateUrl: './delete-vacancy-dialog.component.html',
  styleUrls: ['./delete-vacancy-dialog.component.scss']
})
export class DeleteVacancyDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteVacancyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }

  ngOnInit() {
  }

  deleteVacancy(choice: boolean): void {
    choice ? this.dialogRef.close(choice) : this.dialogRef.close(choice);
  }

}
