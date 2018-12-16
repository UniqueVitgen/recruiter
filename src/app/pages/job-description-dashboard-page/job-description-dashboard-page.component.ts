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
  searchValue: string;
  constructor(private vacancyService: VacancyService) { }

  ngOnInit() {
    this.getVacancies();
  }
  search(value: string) {
    this.searchValue = value;
  }
  getVacancies() {
    this.vacancyService.getAll().subscribe(res => {
      console.log(res);
      this.jobDescriptionList = res;
      console.log('this.jobDescriptionList', this.jobDescriptionList);
    });
  }
  deleteVacancy(index: number) {
    const object = this.jobDescriptionList[index];
    this.vacancyService.delete(object).subscribe(res => { this.getVacancies(); });
  }

}
