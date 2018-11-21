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

  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancyService,
    private candidateService: CandidateService) { }

  ngOnInit() {
    this.getVacancy();
  }
  getVacancy() {
    this.route.params
      .subscribe(params => {
        this.id = Number(params['id']);
        this.vacancyService.get(this.id).subscribe(res => {
          this.vacancy = res;
          this.getCandidateList(this.vacancy);
          console.log(this.vacancy);
        });
        // this.candidateService.get()
        // Defaults to 0 if no query param provided.
      });
  }

  getCandidateList(vacancy: Vacancy) {
    this.vacancyService.getCandidates(vacancy).subscribe(res => {
      this.candidates = res;
    });
  }

}
