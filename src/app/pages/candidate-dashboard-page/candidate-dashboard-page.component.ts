import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import {SearchWorker} from '../../workers/search/search.worker';
import {CandidateWorker} from '../../workers/candidate/candidate.worker';
import {UserWorker} from '../../workers/user/user.worker';
import {DeleteVacancyDialogComponent} from '../../components/modals/delete-vacancy-dialog/delete-vacancy-dialog.component';
import {MatDialog} from '@angular/material';
import {DeleteCandidateModalComponent} from '../../components/modals/candidate/delete-candidate-modal/delete-candidate-modal.component';
import {Vacancy} from '../../classes/vacancy';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {AlertWithButtonModalComponent} from '../../components/modals/alert-with-button-modal/alert-with-button-modal.component';
import {AlertWithButtonDialogData} from '../../interfaces/dialog/init/alert-with-button-dialog-data';

@Component({
  selector: 'app-candidate-dashboard-page',
  templateUrl: './candidate-dashboard-page.component.html',
  styleUrls: ['./candidate-dashboard-page.component.scss']
})
export class CandidateDashboardPageComponent implements OnInit {
  candidates: Candidate[];
  selectedCandidates: Candidate[];
  mockCandidates: Candidate[];
  searchValue: string;
  vacancies: Vacancy[];
  itemsPerPageValues: number[] = [3, 7, 11];

  constructor(private candidateService: CandidateService, private searchWorker: SearchWorker, private userWorker: UserWorker,
              public dialog: MatDialog, public vacancyService: VacancyService) { }

  ngOnInit() {
    this.getAll();
    this.getVacancies();
    // this.mockCandidates = this.candidateService.mockCandidates;
  }

  search(value: string) {
    this.searchValue = value;
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
  deleteCandidateFromTheBase(candidate: Candidate): void {
    this.candidateService.delete(candidate).subscribe(res => {
      this.getAll();
    });
  }
  deleteCandidate(candidate: Candidate) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
      data: <AlertWithButtonDialogData> {
        buttonText: 'Delete',
        message: 'Do you really want to delete this candidate from the base?',
        title: 'Confirm delete'
      },
      disableClose: true
    });
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      if (resAnswer) {
        this.deleteCandidateFromTheBase(candidate);
      }
    });
  }
  getVacancies() {
    this.vacancyService.getAll().subscribe( res => {
      this.vacancies = res;
    });
  }

}
