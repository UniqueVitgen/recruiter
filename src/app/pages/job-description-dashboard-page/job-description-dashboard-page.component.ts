import { Component, OnInit } from '@angular/core';
import {Vacancy} from '../../classes/vacancy';
import {VacancyService} from '../../services/vacancy/vacancy.service';

@Component({
  selector: 'app-job-description-dashboard-page',
  templateUrl: './job-description-dashboard-page.component.html',
  styleUrls: ['./job-description-dashboard-page.component.scss']
})
export class JobDescriptionDashboardPageComponent implements OnInit {
  jobDescriptionList: Vacancy[];

  constructor(private vacancyService: VacancyService) { }

  ngOnInit() {
    this.vacancyService.getAll().subscribe(res => {
      this.jobDescriptionList = res;
      console.log('this.jobDescriptionList',this.jobDescriptionList);
    });
  }

}
