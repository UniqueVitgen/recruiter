import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Candidate, CandidateDashboardItem} from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import {SearchWorker} from '../../workers/search/search.worker';
import {CandidateWorker} from '../../workers/candidate/candidate.worker';
import {UserWorker} from '../../workers/user/user.worker';
import {DeleteVacancyDialogComponent} from '../../components/modals/delete-vacancy-dialog/delete-vacancy-dialog.component';
import {MatDialog} from '@angular/material';
import {DeleteCandidateModalComponent} from '../../components/modals/candidate/delete-candidate-modal/delete-candidate-modal.component';
import {Vacancy} from '../../classes/vacancy';
import {VacancyService} from '../../services/vacancy/vacancy.service';
import {AlertWithButtonModalComponent} from '../../components/modals/alert-with-button-modal/alert-with-button-modal.component';
import {AlertWithButtonDialogData} from '../../interfaces/dialog/init/alert-with-button-dialog-data';
import {CandidateModalComponent} from '../../components/modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogData} from '../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateDialogResult} from '../../interfaces/dialog/result/candidate-dialog-result';
import {EnumWorker} from '../../workers/enum/enum.worker';
import {CandidateState} from '../../enums/candidate-state.enum';
import {VacancyState} from '../../enums/vacancy-state.enum';
import {Subscription} from 'rxjs';
import {ArrayWorker} from '../../workers/array/array.worker';
import {DateTimeWorker} from '../../workers/date-time/date-time.worker';
import {PositionService} from '../../services/position/position.service';
import {PositionModel} from '../../classes/position-model';
import {SortDirection} from '../../enums/sort-direction.enum';
import {SortField} from '../../classes/html/sort-field';

@Component({
  selector: 'app-candidate-dashboard-page',
  templateUrl: './candidate-dashboard-page.component.html',
  styleUrls: ['./candidate-dashboard-page.component.scss']
})
export class CandidateDashboardPageComponent implements OnInit {
  candidates: CandidateDashboardItem[];
  positions: PositionModel[];
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
  includeUndefinedBirthday: boolean = true;
  sourceProperties: SortField[];
  sourceDirections: string[];
  sortDirection: SortDirection;
  sortedProperty: string;
  constructor(private candidateService: CandidateService, private searchWorker: SearchWorker, private userWorker: UserWorker,
              private enumWorker: EnumWorker,
              private dateTimeWorker: DateTimeWorker,
              private arrayWorker: ArrayWorker,
              private positionService: PositionService,
              public dialog: MatDialog, public vacancyService: VacancyService) { }

  ngOnInit() {
    this.sourceProperties = [
      {field: 'fullname', text: 'Fullname'},
      {field: 'age', text: 'Age'},
      {field: 'salaryInDollars', text: 'Required salary'},
      {field: 'candidateState', text: 'Status'}
    ];
    this.sourceDirections = this.enumWorker.getKeysFromEnum(SortDirection);
    console.log('sourceProperties', this.sourceProperties);
    this.getAll().add(() => {
      this.lowSalary = this.arrayWorker.calculateMin(this.candidates, 'salaryInDollars');
      this.topSalary = this.arrayWorker.calculateMax(this.candidates, 'salaryInDollars');
      this.minSalary = this.lowSalary;
      this.maxSalary = this.topSalary;
      const candidateWithAges = this.candidates.filter(candidate => !isNaN(candidate.age) && candidate.age);
      this.lowYearRequired = this.arrayWorker.calculateMin(candidateWithAges, 'age');
      this.topYearRequired = this.arrayWorker.calculateMax(candidateWithAges, 'age');
      this.minYearRequired = this.lowYearRequired;
      this.maxYearRequired = this.topYearRequired;
    });
    this.getVacancies();
    this.getPositions();
    this.sourceStatuses = this.enumWorker.getValuesFromEnum(CandidateState);
    this.selectedStatuses = this.enumWorker.getValuesFromEnum(CandidateState);
    this.sortedProperty = this.sourceProperties[0].field;
    this.sortDirection = <any>this.sourceDirections[0];
    // this.mockCandidates = this.candidateService.mockCandidates;
  }
  clickAdvancedSearch() {
    this.isFilter = !this.isFilter;
  }

  search(value: string) {
    this.searchValue = value;
  }

  getAll(): Subscription {
    console.log('1');
    return this.candidateService.getAll().subscribe((res: CandidateDashboardItem[]) => {
      console.log (res);
      this.candidates = res;
      this.candidates = this.candidates.map((candidate: CandidateDashboardItem) => {
        if (candidate.birthday) {
          const birthday = new Date(candidate.birthday);
          candidate.age = this.dateTimeWorker.calculateAge(birthday);
        }
        return candidate;
      });
      console.log('resCandidates', this.candidates);
    }, err => {
      console.log('1' + err);
    });
  }
  deleteCandidateFromTheBase(candidate: Candidate): void {
    this.candidateService.delete(candidate).subscribe(res => {
      this.getAll();
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
      this.positions = resPositions;
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
        console.log('res - ', res);
        this.getAll();
      }
    });
  }

}
