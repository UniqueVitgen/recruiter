import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import {MatDialog} from '@angular/material';
import {JobDescriptionModalComponent} from '../../modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../../interfaces/dialog/job-description-dialog-data';
import {CandidateDialogData} from '../../../interfaces/dialog/candidate-dialog-data';
import {CandidateModalComponent} from '../../modals/candidate/candidate-modal/candidate-modal.component';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.scss']
})
export class CandidateDashboardComponent implements OnInit {
  @Input() candidates: Candidate[];
  @Input() haveAddElement: boolean;

  private mockCandidate: Candidate;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  addCandidate() {
    const dialogRef = this.dialog.open(CandidateModalComponent, {
        data: <CandidateDialogData> {
        }
      }
    );
  }

}
