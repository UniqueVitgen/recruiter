import {Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Candidate} from '../../../classes/candidate';
import {Attachment} from '../../../classes/attachment';
import {MAT_DIALOG_DATA, MatDialogRef, TooltipPosition} from '@angular/material';
import {DeleteVacancyDialogComponent} from '../delete-vacancy-dialog/delete-vacancy-dialog.component';
import {Vacancy} from '../../../classes/vacancy';

@Component({
  selector: 'app-existed-candidates-modal-window',
  templateUrl: './existed-candidates-modal-window.component.html',
  styleUrls: ['./existed-candidates-modal-window.component.scss']
})
export class ExistedCandidatesModalWindowComponent implements OnInit {
  public candidates: Candidate[];
  public photo: Attachment;
  public numberOfAvailableCandidates: number;
  public noCandidateToAdd: boolean;
  public addMoreCandidates: boolean;
  public matToolTipPositionSelect: TooltipPosition = 'above';
  public selectedCandidatesIDs: number[] = [];

  constructor(private candidateService: CandidateService,
              public dialogRef: MatDialogRef<DeleteVacancyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { currentVacancy: Vacancy }) {
  }


  addCandidate(choice: number): void {
    console.log('CHOISE RESULT: ' + choice);
    this.dialogRef.close({addCandidate: true, addArray: false, chosenCandidateID: choice});

  }

  addaSelectedCanidates(): void {
    console.log('Need to add:');
    console.log(this.selectedCandidatesIDs);
    this.dialogRef.close({addCandidate: true, addArray: true, chosenCandidateID: this.selectedCandidatesIDs});
  }

  close(): void {
    this.dialogRef.close({addCandidate: false, addArray: false, chosenCandidateID: -1});
  }

  ngOnInit() {
    this.getAll();
  }

  isThisCandidateAlreadyHere(candidateForCheck: Candidate): boolean {
    return this.data.currentVacancy.candidates.every(candidate => {
      return candidate.id !== candidateForCheck.id;
    });
  }

  isThisCandidateChosen(candidate: number): boolean {
    return this.selectedCandidatesIDs.some(candidateID => {
      return candidateID === candidate;
    });
  }

  getAll(): void {
    this.candidateService.getAll().subscribe(res => {
      this.candidates = res;
      this.numberOfAvailableCandidates = res.length - this.data.currentVacancy.candidates.length;
      this.noCandidateToAdd = this.numberOfAvailableCandidates === 0;
    }, err => {
      console.log('1' + err);
    });
    this.addMoreCandidates = false;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectClick(candidateID: number): void {
    console.log('Selected #');
    console.log(candidateID);
    if (!this.selectedCandidatesIDs.some((item: number) => {
      return item === candidateID;
    })
    ) {
      this.selectedCandidatesIDs.push(candidateID);
    } else {
      this.selectedCandidatesIDs = this.selectedCandidatesIDs.filter(item => {
        return item !== candidateID;
      });
    }
    this.addMoreCandidates = this.selectedCandidatesIDs.length > 0;
    console.log(this.selectedCandidatesIDs);
  }
}
