import { Component, OnInit } from '@angular/core';
import {Vacancy} from '../../classes/vacancy';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {EnumWorker} from '../../workers/enum/enum.worker';
import {VacancyState} from '../../enums/vacancy-state.enum';
import {TypeCheckingWorker} from '../../workers/type-checking/type-checking.worker';
import {ArrayWorker} from '../../workers/array/array.worker';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-job-description-dashboard-page',
  templateUrl: './job-description-dashboard-page.component.html',
  styleUrls: ['./job-description-dashboard-page.component.scss']
})
export class JobDescriptionDashboardPageComponent implements OnInit {
  jobDescriptionList: Vacancy[];
  private selectedJobDescriptionList: Vacancy[];
  searchValue: string;
  itemsPerPageValues: number[] = [5, 10, 20];
  minSalary: number;
  maxSalary: number;
  lowSalary: number;
  topSalary: number;
  lowYearRequired: number;
  topYearRequired: number;
  minYearRequired: number;
  maxYearRequired: number;
  public isFilter;
  public toppingList: string[];
  public selectedList: string[];
  constructor(private vacancyService: VacancyService,
              private typeCheckingWorker: TypeCheckingWorker,
              private arrayWorker: ArrayWorker,
              private enumWorker: EnumWorker) { }

  ngOnInit() {
    this.getVacancies().add(() => {
      this.lowSalary = this.arrayWorker.calculateMin(this.jobDescriptionList, 'salaryInDollarsFrom');
      this.topSalary = this.arrayWorker.calculateMax(this.jobDescriptionList, 'salaryInDollarsTo');
      this.lowYearRequired = this.arrayWorker.calculateMin(this.jobDescriptionList, 'experienceYearsRequire');
      this.topYearRequired = this.arrayWorker.calculateMax(this.jobDescriptionList, 'experienceYearsRequire');
    });
    this.getStatuses();
  }
  changeStatusFilter() {
  }
  search(value: string) {
    this.searchValue = value;
  }
  getStatuses() {
    this.toppingList = this.enumWorker.getKeysFromEnum(VacancyState);
    this.selectedList = this.enumWorker.getKeysFromEnum(VacancyState);
  }
  getVacancies(): Subscription {
    return this.vacancyService.getAll().subscribe(res => {
      console.log(res);
      this.jobDescriptionList = res;
      this.selectedJobDescriptionList = this.typeCheckingWorker.parseObject(res);
      console.log('this.jobDescriptionList', this.jobDescriptionList);
    });
  }
  deleteVacancy(index: number) {
    const object = this.jobDescriptionList[index];
    this.vacancyService.delete(object).subscribe(res => { this.getVacancies(); });
  }
  clickAdvancedSearch() {
    this.isFilter = !this.isFilter;
  }

}
