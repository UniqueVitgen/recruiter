import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { ModalComponentComponent } from '../../../modals/modal-component/modal-component.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NameCandidateModalComponent } from '../../../modals/candidate/name-candidate-modal/name-candidate-modal.component';
import { StatusCandidateModalComponent } from '../../../modals/candidate/status-candidate-modal/status-candidate-modal.component';

@Component({
  selector: 'app-short-info-user',
  templateUrl: './short-info-user.component.html',
  styleUrls: ['./short-info-user.component.scss']
})
export class ShortInfoUserComponent implements OnInit {
  @Input() candidate: Candidate;

  tests = {
    phone: false,
    skype: false,
    email: false
  };

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openStatusDialog(): void {
    const dialogRef = this.dialog.open(StatusCandidateModalComponent, {
      data: this.candidate
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  openNameDialog(): void {
    const dialogRef = this.dialog.open(NameCandidateModalComponent, {
      data: this.candidate
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      // this.animal = result;
    });
  }

}
