import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {Vacancy} from '../../classes/vacancy';
import {CandidateService} from '../../services/candidate/candidate.service';
import {Candidate} from '../../classes/candidate';
import {JobDescriptionDialogData} from '../../interfaces/dialog/init/job-description-dialog-data';
import {JobDescriptionModalComponent} from '../../components/modals/job-description/job-description-modal/job-description-modal.component';
import {BaseDialogResult} from '../../interfaces/dialog/result/base-dialog-result';
import {ExistedCandidatesModalWindowComponent} from '../../components/modals/existed-candidates-modal-window/existed-candidates-modal-window.component';
import {MatDialog} from '@angular/material';
import {AlertWithButtonModalComponent} from '../../components/modals/alert-with-button-modal/alert-with-button-modal.component';
import {AlertWithButtonDialogData} from '../../interfaces/dialog/init/alert-with-button-dialog-data';
import {CandidateModalComponent} from '../../components/modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogData} from '../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateDialogResult} from '../../interfaces/dialog/result/candidate-dialog-result';
import {forEach} from '@angular/router/src/utils/collection';
import {ArrayWorker} from '../../workers/array/array.worker';
import {UserWorker} from '../../workers/user/user.worker';


@Component({
  selector: 'app-job-description-page',
  templateUrl: './job-description-page.component.html',
  styleUrls: ['./job-description-page.component.scss']
})
export class JobDescriptionPageComponent implements OnInit {
  id: number;
  vacancy: Vacancy;
  candidates: Candidate[];
  searchInputSelected: boolean;
  searchValueSelected: string;
  fullname: string[];

  //searchValuePossible: string;

  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancyService,
    public dialog: MatDialog,
    private userWorker: UserWorker,
    private arrayWorker: ArrayWorker,
    private candidateService: CandidateService) {
    this.searchInputSelected = false;
  }

  ngOnInit() {
    this.getVacancy();
    this.getAllCondidates();
  }

  getAllCondidates(): void {
    console.log('1');
    this.candidateService.getAll().subscribe(res => {
      console.log(res);
      this.candidates = res;
    }, err => {
      console.log('1' + err);
    });

  }
  generateFullnames(): void {
    this.fullname = this.vacancy.candidates.map(candidate => {
      return this.userWorker.formatFullName(candidate);
    });
    console.log('fullnames', this.fullname);
  }
  changeSearchInputSelected(): void {
    this.searchInputSelected = !this.searchInputSelected;
  }

  addModalCandidate() {
    const vacancies: Vacancy[] = [this.vacancy];
    const dialogRef = this.dialog.open(CandidateModalComponent, {
        data: <CandidateDialogData> {
          sourceVacancies: vacancies
        },
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe((res: CandidateDialogResult) => {
      if (res) {
        console.log('res - ', res);
        this.addCandidate(res.resCandidate);
      }
    });
  }

  // changeSearchInputPossible(): void {
  //   this.searchInputPossible = !this.searchInputPossible;
  // }

  searchSelected(value: string): void {
    this.searchValueSelected = value;
  }

  // searchPossible(value: string): void {
  //   this.searchValuePossible = value;
  // }

  getVacancy(): void {
    this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this.vacancyService.get(this.id).subscribe(res => {
          this.vacancy = res;
          this.generateFullnames();
          this.getCandidateList(this.vacancy);
          console.log(this.vacancy);
        });
        // this.candidateService.get()
        // Defaults to 0 if no query param provided.
      });
  }

  addCandidate(candidate: Candidate): void {
    console.log('candidate', candidate);
    if (this.vacancy.candidates == null) {
      this.vacancy.candidates = [];
    }
    this.vacancy.candidates.push(candidate);
    this.vacancyService.update(this.vacancy).subscribe(resVacancy => {
     // console.log(resVacancy);
      this.getVacancy();
    });
  }

  deleteCandidate(candidate: Candidate): void {
    console.log('Delete candidate page:');
    // console.log(candidateID);
    this.vacancy.candidates = this.arrayWorker.removeElement(this.vacancy.candidates, candidate);
    // this.vacancy.candidates.splice(candidateID, 1);
    console.log(this.vacancy.candidates);
    this.vacancyService.update(this.vacancy).subscribe(resVacancy => {
      console.log(resVacancy);
      this.getVacancy();
    });
  }

  askForDeleteCandidate(candidate: Candidate) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this candidate from the vacancy?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      if (resAnswer) {
        this.deleteCandidate(candidate);
      }
    });

  }

  deleteCandidateFromTheBase(candidate: Candidate): void {
    console.log('Delete candidate page:');
    console.log(candidate);
    this.candidateService.delete(candidate).subscribe(res => {
      this.getAllCondidates();
      this.getVacancy();
    });
  }

  askForDeleteCandidateFromTheBase(candidate: Candidate) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
        data: <AlertWithButtonDialogData> {
          buttonText: 'Delete',
          message: 'Do you really want to delete this candidate from the base?',
          title: 'Confirm delete'
        },
        disableClose: true
      }
    );
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      if (resAnswer) {
        this.deleteCandidateFromTheBase(candidate);
      }
    });

  }

  changeVacancy(vacancy: Vacancy): void {
    this.getVacancy();
  }

  getCandidateList(vacancy: Vacancy): void {
    this.vacancyService.getCandidates(vacancy).subscribe(res => {
    });
  }

  openExistingCandidatesModalWindow(): void {
    const dialogRef = this.dialog.open(ExistedCandidatesModalWindowComponent, {
        data: {currentVacancy: this.vacancy},
        disableClose: true,
        width: '850px'
      }
    );
    dialogRef.afterClosed().subscribe((existingCandidatesModalWindowResult) => {
      console.log('Close!' + existingCandidatesModalWindowResult.addCandidate);
      if (existingCandidatesModalWindowResult.addCandidate) {
        if (!existingCandidatesModalWindowResult.addArray) {
          this.addCandidate(this.candidates[existingCandidatesModalWindowResult.chosenCandidateID]);
        } else {
          existingCandidatesModalWindowResult.chosenCandidateID.forEach( candidateID => {
            this.addCandidate(this.candidates[candidateID]);
          });
        }

      }
    });
  }

}
