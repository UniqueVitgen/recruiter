import {Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Candidate} from '../../../classes/candidate';
import {Attachment} from '../../../classes/attachment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DeleteVacancyDialogComponent} from '../delete-vacancy-dialog/delete-vacancy-dialog.component';
import {Vacancy} from '../../../classes/vacancy';

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
              @Inject(MAT_DIALOG_DATA) public data: { currentVacancy: Vacancy }) {
  }


  addCandidate(choice: number): void {
    console.log('CHOISE RESULT: ' + choice);
    this.dialogRef.close({addCandidate: true, chosenCandidateID: choice});

  }

  close(): void {
    this.dialogRef.close({addCandidate: false, chosenCandidateID: -1});
  }

  ngOnInit() {
    this.getAll();
  }

  isThisCandidateAlreadyHere(candidateForCheck: Candidate): boolean {
    return this.data.currentVacancy.candidates.every(candidate => {
      return candidate.id !== candidateForCheck.id;
    });
  }

  getAll() {
    this.candidateService.getAll().subscribe(res => {
      this.candidates = res;
    }, err => {
      console.log('1' + err);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }


}
