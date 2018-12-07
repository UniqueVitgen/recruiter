import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import {MatDialog} from '@angular/material';
import {JobDescriptionModalComponent} from '../../modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../../interfaces/dialog/init/job-description-dialog-data';
import {CandidateDialogData} from '../../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateModalComponent} from '../../modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogResult} from '../../../interfaces/dialog/result/candidate-dialog-result';
import {UserWorker} from '../../../workers/user/user.worker';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.scss']
})
export class CandidateDashboardComponent implements OnInit, OnChanges {
  @Input() candidates: Candidate[];
  @Input() haveAddElement: boolean;
  @Input() search;
  @Output('addCandidate') outputAddCandidate: EventEmitter<Candidate> = new EventEmitter();
  @Output('deleteCandidate') outputDeleteCandidate: EventEmitter<any> = new EventEmitter();
  public selectedCandidates: Candidate[];

  private mockCandidate: Candidate;

  constructor(public dialog: MatDialog, private userWorker: UserWorker) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchValues(this.search);
  }

  searchValues(value: string) {
    if (value) {
      const valueLowercase = value.toLowerCase();
      this.selectedCandidates = this.candidates.filter((candidate) => {
        const fullname = this.userWorker.formatFullName(candidate).toLowerCase();
        const surname = candidate.surname.toLowerCase();
        return fullname.indexOf(valueLowercase) > -1
          // || name.indexOf(valueLowercase) > -1
          || surname.indexOf(valueLowercase) > -1;
      });
    } else {
      this.selectedCandidates = this.candidates;
    }
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
