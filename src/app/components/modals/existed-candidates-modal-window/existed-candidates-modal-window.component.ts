import {Component, Inject, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {Candidate, CandidateDashboardItem, CandidateSelected} from '../../../classes/candidate';
import {Attachment} from '../../../classes/attachment';
import {MAT_DIALOG_DATA, MatDialogRef, TooltipPosition} from '@angular/material';
import {DeleteVacancyDialogComponent} from '../delete-vacancy-dialog/delete-vacancy-dialog.component';
import {Vacancy} from '../../../classes/vacancy';
import {PaginationStorage} from '../../../storages/pagination.storage';

@Component({
  selector: 'app-existed-candidates-modal-window',
  templateUrl: './existed-candidates-modal-window.component.html',
  styleUrls: ['./existed-candidates-modal-window.component.scss']
})
export class ExistedCandidatesModalWindowComponent implements OnInit {
  public candidates: CandidateSelected[];
  public neededCandidates: CandidateSelected[];
  public photo: Attachment;
  public numberOfAvailableCandidates: number;
  public noCandidateToAdd: boolean;
  public addMoreCandidates: boolean;
  public selectedCandidatesIDs: number[] = [];
  itemsPerPageValues: number[] = [3, 6, 9];
  page: number;
  size: number;
  idPagination: number = 1;

  isCheck: boolean;

  constructor(private candidateService: CandidateService,
              public dialogRef: MatDialogRef<DeleteVacancyDialogComponent>,
              private paginationStorage: PaginationStorage,
              @Inject(MAT_DIALOG_DATA) public data: { currentVacancy: Vacancy }) {
  }

  changePaginationObject(): void {
    // console.log(this.page, this.size)
    this.paginationStorage.setExictedCandidatePagination({
      page: this.page,
      size: this.size
    });
  }

  initPaginationObject() {
    const paginationObject = this.paginationStorage.getExictedCandidatePagination();
    if (paginationObject != null) {
      this.page = paginationObject.page;
      this.size = paginationObject.size;
    }
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
    this.initPaginationObject();
  }

  isThisCandidateAlreadyHere(candidateForCheck: Candidate): boolean {
    return this.data.currentVacancy.candidates.every(candidate => {
      return candidate.id !== candidateForCheck.id;
    });
  }

  filterNeededCandidates(candidates: Candidate[]): Candidate[] {
    return candidates.filter(candidate => {
      return this.isThisCandidateAlreadyHere(candidate);
    });
  }

  getCandidateNumber(candidateID): number {
    let res = -1;
    this.candidates.forEach((candidate, i) => {
      if (candidate.id === candidateID) {
        res = i;
      }
    });
    return res;
  }

  isThisCandidateChosen(candidate: number): boolean {
    return this.selectedCandidatesIDs.some(candidateID => {
      return candidateID === candidate;
    });
  }

  getAll(): void {
    this.candidateService.getAll().subscribe(res => {
      this.candidates = <CandidateSelected[]>res;
      this.neededCandidates = this.filterNeededCandidates(this.candidates);
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

    console.log(candidateID);
    console.log('NEEDED CANDIDATE', this.neededCandidates);
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
    if (this.candidates[candidateID].select) {
      this.candidates[candidateID].select = false;
    } else {
      this.candidates[candidateID].select = true;
    }
    console.log(this.selectedCandidatesIDs);
  }
}
