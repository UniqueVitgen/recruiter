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
import {SortDirection} from '../../enums/sort-direction.enum';
import {SortField} from '../../classes/html/sort-field';
import {SortStorage} from '../../storages/sort.storage';
import {FilterStorage} from '../../storages/filter.storage';
import {CandidateState} from '../../enums/candidate-state.enum';

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
  sourceProperties: SortField[];
  sourceDirections: string[];
  sortDirection: SortDirection;
  sortedProperty: string;
  constructor(private vacancyService: VacancyService,
              public dialog: MatDialog,
              private typeCheckingWorker: TypeCheckingWorker,
              private positionWorker: PositionWorker,
              private sortStorage: SortStorage,
              private filterStorage: FilterStorage,
              private arrayWorker: ArrayWorker,
              private positionService: PositionService,
              private enumWorker: EnumWorker) { }

  ngOnInit() {
    this.initSort();
    this.getVacancies().add(() => {
      this.lowSalary = this.arrayWorker.calculateMin(this.jobDescriptionList, 'salaryInDollarsFrom');
      this.topSalary = this.arrayWorker.calculateMax(this.jobDescriptionList, 'salaryInDollarsTo');
      this.lowYearRequired = this.arrayWorker.calculateMin(this.jobDescriptionList, 'experienceYearsRequire');
      this.topYearRequired = this.arrayWorker.calculateMax(this.jobDescriptionList, 'experienceYearsRequire');
      const filterObject = this.filterStorage.getVacancyFilter();
      if (filterObject) {
        this.minSalary = filterObject.minSalary;
        this.maxSalary = filterObject.maxSalary;
        this.minYearRequired = filterObject.minYearRequired;
        this.maxYearRequired = filterObject.maxYearRequired;
        this.selectedList = filterObject.selectedStatuses;
        this.isFilter = filterObject.isFilter;
      } else {
        this.minSalary = this.lowSalary;
        this.maxSalary = this.topSalary;
        this.minYearRequired = this.lowYearRequired;
        this.maxYearRequired = this.topYearRequired;
        this.selectedList = this.enumWorker.getValuesFromEnum(VacancyState);
        this.isFilter = false;
      }
    });
    this.getStatuses();
    this.getPositions();
  }
  initSort() {
    this.sourceProperties = [
      {field: 'position', text: 'Position'},
      {field: 'salaryInDollarsFrom', text: 'Min required salary'},
      {field: 'salaryInDollarsTo', text: 'Max required salary'},
      {field: 'vacancyState', text: 'Status'},
      {field: 'experienceYearsRequire', text: 'Required experience years'},
      {field: 'candidates', text: 'Count candidates'}
    ];
    this.sourceDirections = this.enumWorker.getKeysFromEnum(SortDirection);
    const sortObject = this.sortStorage.getVacancySort();
    if (sortObject) {
      this.sortedProperty = <any>sortObject.field;
      this.sortDirection = sortObject.direction;
    } else {
      this.sortedProperty = this.sourceProperties[0].field;
      this.sortDirection = <any>this.sourceDirections[0];
    }
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
  changeSortObject() {
    this.sortStorage.setVacancySort({
      direction: this.sortDirection,
      field: <any> this.sortedProperty
    });
  }
  changeFilterObject() {
    this.filterStorage.setVacancyFilter({
      minSalary: this.minSalary,
      maxSalary: this.maxSalary,
      minYearRequired: this.minYearRequired,
      maxYearRequired: this.maxYearRequired,
      selectedStatuses: this.selectedList,
      isFilter: this.isFilter
    });
  }

}
