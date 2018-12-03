import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import {MatDialog} from '@angular/material';
import {JobDescriptionModalComponent} from '../../modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../../interfaces/dialog/init/job-description-dialog-data';
import {CandidateDialogData} from '../../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateModalComponent} from '../../modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogResult} from '../../../interfaces/dialog/result/candidate-dialog-result';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.scss']
})
export class CandidateDashboardComponent implements OnInit {
  @Input() candidates: Candidate[];
  @Input() haveAddElement: boolean;
  @Output('addCandidate') outputAddCandidate: EventEmitter<Candidate> = new EventEmitter();
  @Output('deleteCandidate') outputDeleteCandidate: EventEmitter<any> = new EventEmitter();

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
    dialogRef.afterClosed().subscribe((res: CandidateDialogResult) => {
      if (res) {
        this.outputAddCandidate.emit(res.resCandidate);
      }
    });
  }
  deleteCandidate() {
    console.log('rerew');
    this.outputDeleteCandidate.emit();
  }

}
