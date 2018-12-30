import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-delete-candidate-modal',
  templateUrl: './delete-candidate-modal.component.html',
  styleUrls: ['./delete-candidate-modal.component.scss']
})
export class DeleteCandidateModalComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DeleteCandidateModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }

  ngOnInit() {
  }

  deleteVacancy(choice: boolean): void {
    choice ? this.dialogRef.close(choice) : this.dialogRef.close(choice);
  }

}
