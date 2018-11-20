import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {Vacancy} from '../../classes/vacancy';

@Component({
  selector: 'app-job-description-page',
  templateUrl: './job-description-page.component.html',
  styleUrls: ['./job-description-page.component.scss']
})
export class JobDescriptionPageComponent implements OnInit {
  id: number;
  vacancy: Vacancy;

  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancyService) { }

  ngOnInit() {
    this.getVacancy();
  }
  getVacancy() {
    this.route.params
      .subscribe(params => {
        this.id = Number(params['id']);
        this.vacancyService.get(this.id).subscribe(res => {
          this.vacancy = res;
        });
        // this.candidateService.get()
        // Defaults to 0 if no query param provided.
      });
  }

}
