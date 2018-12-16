import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {Vacancy} from '../../classes/vacancy';
import {CandidateService} from '../../services/candidate/candidate.service';
import {Candidate} from '../../classes/candidate';

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
    private candidateService: CandidateService) {
    this.searchInput = false;
  }

  ngOnInit() {
    this.getVacancy();
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

  getCandidateList(vacancy: Vacancy): void {
    this.vacancyService.getCandidates(vacancy).subscribe(res => {
    });
  }

}
