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
  deleteCandidate(candidate: Candidate) {
    console.log('candidate', candidate);
    const dialogRef = this.dialog.open(DeleteCandidateModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.candidateService.delete(candidate.id).subscribe(res => {
          this.getAll();
        });
      }
    });
  }
  getVacancies() {
    this.vacancyService.getAll().subscribe( res => {
      this.vacancies = res;
    });
  }

}
