import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Candidate, CandidateDashboardItem} from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import {SearchWorker} from '../../workers/search/search.worker';
import {UserWorker} from '../../workers/user/user.worker';
import {MatDialog} from '@angular/material';
import {Vacancy} from '../../classes/vacancy';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {AlertWithButtonModalComponent} from '../../components/modals/alert-with-button-modal/alert-with-button-modal.component';
import {AlertWithButtonDialogData} from '../../interfaces/dialog/init/alert-with-button-dialog-data';
import {CandidateModalComponent} from '../../components/modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogData} from '../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateDialogResult} from '../../interfaces/dialog/result/candidate-dialog-result';
import {EnumWorker} from '../../workers/enum/enum.worker';
import {CandidateState} from '../../enums/candidate-state.enum';
import {Subscription} from 'rxjs';
import {ArrayWorker} from '../../workers/array/array.worker';
import {DateTimeWorker} from '../../workers/date-time/date-time.worker';
import {PositionService} from '../../services/position/position.service';
import {SortDirection} from '../../enums/sort-direction.enum';
import {SortField} from '../../classes/html/sort-field';
import {SortStorage} from '../../storages/sort.storage';
import {SortDashboard} from '../../classes/dashboard/sort-dashboard';
import {FilterStorage} from '../../storages/filter.storage';
import {PaginationStorage} from '../../storages/pagination.storage';

@Component({
  selector: 'app-candidate-dashboard-page',
  templateUrl: './candidate-dashboard-page.component.html',
  styleUrls: ['./candidate-dashboard-page.component.scss']
})
export class CandidateDashboardPageComponent implements OnInit {
  candidates: CandidateDashboardItem[];
  // positions: string[];
  fullnames: string[];
  sourceStatuses: string[];
  selectedStatuses: string[];
  searchValue: string;
  vacancies: Vacancy[];
  itemsPerPageValues: number[] = [4, 8, 12];
  page: number;
  size: number;
  idPagination: number = 1;
  isFilter: boolean;
  minSalary: number;
  maxSalary: number;
  lowSalary: number;
  topSalary: number;
  lowYearRequired: number;
  topYearRequired: number;
  minYearRequired: number;
  maxYearRequired: number;
  includeUndefinedBirthday: boolean;
  validSalaryFilter: boolean;
  validYearsRequiredFilter: boolean;
  sourceProperties: SortField[];
  sourceDirections: string[];
  sortDirection: SortDirection;
  sortedProperty: string;
  filteredCandidatesLength: number = 0;
  constructor(private candidateService: CandidateService,
              private searchWorker: SearchWorker,
              private userWorker: UserWorker,
              private enumWorker: EnumWorker,
              private dateTimeWorker: DateTimeWorker,
              private arrayWorker: ArrayWorker,
              private positionService: PositionService,
              private sortStorage: SortStorage,
              private filterStorage: FilterStorage,
              private paginationStorage: PaginationStorage,
              private cd: ChangeDetectorRef,
              public dialog: MatDialog, public vacancyService: VacancyService) { }

  ngOnInit() {
    this.initPage();
    // this.mockCandidates = this.candidateService.mockCandidates;
  }
  initPage() {
    this.sourceProperties = [
      {field: 'fullname', text: 'Fullname'},
      {field: 'age', text: 'Age'},
      {field: 'salaryInDollars', text: 'Required salary'},
      {field: 'candidateState', text: 'Status'}
    ];
    this.sourceDirections = this.enumWorker.getKeysFromEnum(SortDirection);
    // console.log('sourceProperties', this.sourceProperties);
    this.getAll().add(() => {
      this.generateFullnames();
      console.log(this.candidates.map(candidate => candidate.salaryInDollars))
      this.lowSalary = this.arrayWorker.calculateMin(this.candidates, 'salaryInDollars');
      this.topSalary = this.arrayWorker.calculateMax(this.candidates, 'salaryInDollars');
      const candidateWithAges = this.candidates.filter(candidate => !isNaN(candidate.age) && candidate.age);
      this.lowYearRequired = this.arrayWorker.calculateMin(candidateWithAges, 'age');
      this.topYearRequired = this.arrayWorker.calculateMax(candidateWithAges, 'age');
      // console.log('lowYearRequired', this.lowYearRequired);
      // console.log('topYearRequired', this.topYearRequired);
      // this.changeFilterObject();
        this.initFilterObject();
      this.sourceStatuses = this.enumWorker.getValuesFromEnum(CandidateState);
    });
    this.getVacancies();
    this.getPositions();
    this.initFilterObject();
    this.initSortObject();
    this.initPaginationObject();
  }
  clickAdvancedSearch() {
    this.changeFilterObject();
  }
  initFilterObject() {
    setTimeout(() => {
      const filterObject = this.filterStorage.getCandidateFilter();
      if (filterObject) {
        this.minSalary = filterObject.minSalary;
        this.maxSalary = filterObject.maxSalary;
        this.minYearRequired = filterObject.minYearRequired;
        this.maxYearRequired = filterObject.maxYearRequired;
        this.selectedStatuses = filterObject.selectedStatuses;
        this.includeUndefinedBirthday = filterObject.includeUndefinedBirthday;
        this.isFilter = filterObject.isFilter;
      } else {
        this.minSalary = this.lowSalary;
        this.maxSalary = this.topSalary;
        this.minYearRequired = this.lowYearRequired;
        this.maxYearRequired = this.topYearRequired;
        this.selectedStatuses = this.enumWorker.getValuesFromEnum(CandidateState);
        this.includeUndefinedBirthday = true;
        this.isFilter = false;
      }
      // console.log('filterObject', filterObject);
      if (this.minYearRequired < this.lowYearRequired || filterObject.minYearRequiredOnTheEdge) {
        this.minYearRequired = this.lowYearRequired;
      }
      if (this.maxYearRequired > this.topYearRequired || filterObject.maxYearRequiredOnTheEdge) {
        this.maxYearRequired = this.topYearRequired;
      }
      if (this.minSalary < this.lowSalary || filterObject.minSalaryOnTheEdge) {
        this.minSalary = this.lowSalary;
      }
      if (this.maxSalary > this.topSalary || filterObject.maxSalaryOnTheEdge) {
        this.maxSalary = this.topSalary;
      }
      // this.cd.detectChanges();
      // console.log('maxSalary', filterObject.maxSalaryOnTheEdge, this.topSalary, this.maxSalary);
    }, 0);
  }
  initSortObject() {
    const sortObject: SortDashboard = this.sortStorage.getCandidateSort();
    if (sortObject) {
      this.sortedProperty = <any> sortObject.field;
      this.sortDirection = sortObject.direction;
    } else {
      this.sortedProperty = this.sourceProperties[0].field;
      this.sortDirection = <any>this.sourceDirections[0];
    }
  }
  initPaginationObject() {
    const paginationObject = this.paginationStorage.getCandidatePagination();
    if (paginationObject != null) {
      this.page = paginationObject.page;
      this.size = paginationObject.size;
    }
  }
  changeFilteredLength(value: number) {
    this.filteredCandidatesLength = value;
  }

  search(value: string) {
    this.searchValue = value;
  }

  getAll(): Subscription {
    // console.log('1');
    return this.candidateService.getAll().subscribe((res: CandidateDashboardItem[]) => {
      // console.log (res);
      this.candidates = res;
      this.candidates = this.candidates.map((candidate: CandidateDashboardItem) => {
        if (candidate.birthday) {
          const birthday = new Date(candidate.birthday);
          candidate.age = this.dateTimeWorker.calculateAge(birthday);
        }
        return candidate;
      });
      // setTimeout(() => {
        this.generateFullnames();
      // }, 0);
      // console.log('resCandidates', this.candidates);
    }, err => {
      // console.log('1' + err);
    });
  }
  generateFullnames(): void {
    this.fullnames = this.candidates.map(candidate => {
      return this.userWorker.formatFullName(candidate);
    });
    console.log('fullnames', this.fullnames);
  }
  deleteCandidateFromTheBase(candidate: Candidate): void {
    this.candidateService.delete(candidate).subscribe(res => {
      this.initPage();
    });
  }
  deleteCandidate(candidate: Candidate) {
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
      data: <AlertWithButtonDialogData> {
        buttonText: 'Delete',
        message: 'Do you really want to delete this candidate from the base?',
        title: 'Confirm delete'
      },
      disableClose: true
    });
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      if (resAnswer) {
        this.deleteCandidateFromTheBase(candidate);
      }
    });
  }
  getVacancies() {
    this.vacancyService.getAll().subscribe( res => {
      this.vacancies = res;
    });
  }
  getPositions() {
    this.positionService.getAll().subscribe(resPositions => {
      // this.positions = resPositions.map((itemPosition) => {
      //   return itemPosition.name;
      // });
    });
  }
  addCandidate() {
    const dialogRef = this.dialog.open(CandidateModalComponent, {
        data: <CandidateDialogData> { sourceVacancies: this.vacancies },
        disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe((res: CandidateDialogResult) => {
      if (res) {
        // console.log('res - ', res);
        this.initPage();
      }
    });
  }
  changeSortObject() {
    this.sortStorage.setCandidateSort({
      direction: this.sortDirection,
      field: <any> this.sortedProperty
    });
  }
  changeFilterObject() {
    this.filterStorage.setCandidateFilter({
      includeUndefinedBirthday: this.includeUndefinedBirthday,
      minSalary: this.minSalary,
      minSalaryOnTheEdge: this.minSalary === this.lowSalary,
      maxSalary: this.maxSalary,
      maxSalaryOnTheEdge: this.maxSalary === this.topSalary,
      minYearRequired: this.minYearRequired,
      minYearRequiredOnTheEdge: this.minYearRequired === this.lowYearRequired,
      maxYearRequired: this.maxYearRequired,
      maxYearRequiredOnTheEdge: this.maxYearRequired === this.topYearRequired,
      selectedStatuses: this.selectedStatuses,
      isFilter: this.isFilter
    });
    // console.log('filterobjectchange', this.filterStorage.getCandidateFilter());
  }
  changePaginationObject(): void {
    // console.log(this.page, this.size)
    this.paginationStorage.setCandidatePagination({
      page: this.page,
      size: this.size
    });
  }
  validSalaryFilterChange(value: boolean) {
    // console.log('validSalaryFilterChange', value);
    this.validSalaryFilter = value;
  }
  validYearsRequiredFilterChange(value: boolean) {
    // console.log('validYearsRequiredFilter', value);
    this.validYearsRequiredFilter = value;
  }
}
