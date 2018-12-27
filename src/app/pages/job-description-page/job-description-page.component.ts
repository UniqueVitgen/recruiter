import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-job-description-page',
  templateUrl: './job-description-page.component.html',
  styleUrls: ['./job-description-page.component.scss']
})
export class JobDescriptionPageComponent implements OnInit {
  id: number;
  vacancy: Vacancy;
  candidates: Candidate[];
  searchInput: boolean;
  searchValue: string;

  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancyService,
    public dialog: MatDialog,
    private candidateService: CandidateService) {
    this.searchInput = false;
  }

  ngOnInit() {
    this.getVacancy();
    this.getAllCondidates();
  }

  getAllCondidates() {
    console.log('1');
    this.candidateService.getAll().subscribe(res => {
      console.log(res);
      this.candidates = res;
    }, err => {
      console.log('1' + err);
    });
  }

  changeSearchInput(): void {
    this.searchInput = !this.searchInput;
  }

  search(value: string): void {
    this.searchValue = value;
  }

  getVacancy(): void {
    this.route.params
      .subscribe(params => {
        this.id = params['id'];
        this.vacancyService.get(this.id).subscribe(res => {
          this.vacancy = res;
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
      console.log(resVacancy);
      this.getVacancy();
    });
  }

  changeVacancy(vacancy: Vacancy) {
    this.getVacancy();
  }

  getCandidateList(vacancy: Vacancy): void {
    this.vacancyService.getCandidates(vacancy).subscribe(res => {
    });
  }

  openExistingCandidatesModalWindow(): void {
    const dialogRef = this.dialog.open(ExistedCandidatesModalWindowComponent, {
        disableClose: true,
        height: '500px'
      }
    );
    dialogRef.afterClosed().subscribe((chosenCandidateID) => {
      console.log('Close!' + chosenCandidateID);
      if (chosenCandidateID.add) {
        this.vacancy.candidates.push(this.candidates[chosenCandidateID.result]);
      }
      console.log(this.vacancy.position);
      console.log(this.vacancy.candidates);
    });
  }
}
