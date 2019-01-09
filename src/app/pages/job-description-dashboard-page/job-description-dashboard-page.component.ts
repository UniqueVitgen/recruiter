import {Component, OnChanges, OnInit} from '@angular/core';
import {Vacancy} from '../../classes/vacancy';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {EnumWorker} from '../../workers/enum/enum.worker';
import {VacancyState} from '../../enums/vacancy-state.enum';
import {TypeCheckingWorker} from '../../workers/type-checking/type-checking.worker';
import {ArrayWorker} from '../../workers/array/array.worker';
import {Subscription} from 'rxjs';
import {JobDescriptionModalComponent} from '../../components/modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../interfaces/dialog/init/job-description-dialog-data';
import {BaseDialogResult} from '../../interfaces/dialog/result/base-dialog-result';
import {MatDialog} from '@angular/material';
import {PositionService} from '../../services/position/position.service';
import {PositionModel} from '../../classes/position-model';
import {PositionWorker} from '../../workers/position/position.worker';

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
  page: number;
  size: number;
  minSalary: number;
  maxSalary: number;
  lowSalary: number;
  topSalary: number;
  lowYearRequired: number;
  topYearRequired: number;
  minYearRequired: number;
  maxYearRequired: number;
  idPagination: number = 2;
  public isFilter;
  public toppingList: string[];
  public selectedList: string[];
  public positions: string[];
  constructor(private vacancyService: VacancyService,
              public dialog: MatDialog,
              private typeCheckingWorker: TypeCheckingWorker,
              private positionWorker: PositionWorker,
              private arrayWorker: ArrayWorker,
              private positionService: PositionService,
              private enumWorker: EnumWorker) { }

  ngOnInit() {
    this.getVacancies().add(() => {
      this.lowSalary = this.arrayWorker.calculateMin(this.jobDescriptionList, 'salaryInDollarsFrom');
      this.topSalary = this.arrayWorker.calculateMax(this.jobDescriptionList, 'salaryInDollarsTo');
      this.lowYearRequired = this.arrayWorker.calculateMin(this.jobDescriptionList, 'experienceYearsRequire');
      this.topYearRequired = this.arrayWorker.calculateMax(this.jobDescriptionList, 'experienceYearsRequire');
    });
    this.getStatuses();
    this.getPositions();
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
  getPositions(): Subscription {
    return this.positionService.getAll().subscribe(resPositions => {
      this.positions = this.positionWorker.getStringKeys(resPositions);
    });
  }
  deleteVacancy(index: number) {
    const object = this.jobDescriptionList[index];
    this.vacancyService.delete(object).subscribe(res => { this.getVacancies(); });
  }
  clickAdvancedSearch() {
    this.isFilter = !this.isFilter;
  }

  openJobDescriptionDialog(): void {
    console.log('i');
    const dialogRef = this.dialog.open(JobDescriptionModalComponent, {
        data: <JobDescriptionDialogData> {
          sourceJobDescription: null,
          isEdit: false,
          dialogWindowTitle: 'Create'
        },
        minWidth: '700px',
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<Vacancy>) => {
      if (res) {
        if (res.success) {
          this.getVacancies();
        }
      }
    });
  }

}
