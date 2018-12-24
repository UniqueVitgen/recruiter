import {Component, ElementRef, Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Candidate} from '../../../classes/candidate';
import {CandidateWorker} from '../../../workers/candidate/candidate.worker';
import {UserWorker} from '../../../workers/user/user.worker';
import {Attachment} from '../../../classes/attachment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeleteVacancyDialogComponent} from '../delete-vacancy-dialog/delete-vacancy-dialog.component';

@Component({
  selector: 'app-existed-candidates-modal-window',
  templateUrl: './existed-candidates-modal-window.component.html',
  styleUrls: ['./existed-candidates-modal-window.component.scss']
})
export class ExistedCandidatesModalWindowComponent implements OnInit, OnChanges {
  candidates: Candidate[];
  public photo: Attachment;

  constructor(private candidateService: CandidateService,
              public dialogRef: MatDialogRef<DeleteVacancyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean) {
  }


  addCandidate(choice: number): void {
    this.dialogRef.close({add: true, result: choice});

  }

  close(): void {
    this.dialogRef.close({add: false, result: -1});
  }

  ngOnInit() {
    this.getAll();

    // this.mockCandidates = this.candidateService.mockCandidates;
  }


  getAll() {
    console.log('1');
    this.candidateService.getAll().subscribe(res => {
      console.log(res);
      this.candidates = res;
    }, err => {
      console.log('1' + err);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


}
