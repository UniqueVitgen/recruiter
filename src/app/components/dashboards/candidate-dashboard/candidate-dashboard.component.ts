import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Candidate, CandidateDashboardItem} from 'src/app/classes/candidate';
import {MatDialog} from '@angular/material';
import {CandidateDialogData} from '../../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateModalComponent} from '../../modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogResult} from '../../../interfaces/dialog/result/candidate-dialog-result';
import {UserWorker} from '../../../workers/user/user.worker';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';
import {BootstrapCellEnum} from '../../../enums/bootstrap-cell.enum';
import {SortDirection} from '../../../enums/sort-direction.enum';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.scss']
})
export class CandidateDashboardComponent implements OnInit, OnChanges {
  @Input() candidates: CandidateDashboardItem[];
  @Input() haveAddElement: boolean;
  @Input() haveAddButton: boolean;
  @Input() search;
  @Input() vacancies;
  @Input() haveHoverEffect: boolean = true;
  @Input() isClosedIcon: boolean = true;
  @Input() isDeleteIcon: boolean = true;
  @Input() filledCells: BootstrapCellEnum;
  @Input() isPagination: boolean;
  @Input() itemsPerPageValues: number[];
  @Input() size: number;
  @Input() page: number;
  @Input() idPagination: number;
  @Input() isFilter: boolean;
  @Input() filterStatuses: string[];
  @Input() minSalary: number;
  @Input() maxSalary: number;
  @Input() minYearsRequired: number;
  @Input() maxYearsRequired: number;
  @Input() includeUndefinedBirthday: boolean;
  @Input() isSort: boolean;
  @Input() sortedProperty: string;
  @Input() sortedDirection: SortDirection;
  itemsPerPage: number;
  @Output('addCandidate') outputAddCandidate: EventEmitter<Candidate> = new EventEmitter();
  @Output('deleteCandidate') outputDeleteCandidate: EventEmitter<number> = new EventEmitter();
  @Output('deleteCandidateFromTheBase') outputDeleteCandidateFromTheBase: EventEmitter<number> = new EventEmitter();
  @Input() limitTo: number;
  public selectedCandidates: CandidateDashboardItem[];

  constructor(public dialog: MatDialog, private userWorker: UserWorker, private typeCheckingWorker: TypeCheckingWorker) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isPagination) {
      if (this.itemsPerPage == null) {
        this.itemsPerPage = 4;
      }
    }
    if (this.candidates) {
      this.searchValues(this.search);
      if (this.isFilter) {
        this.selectedCandidates = this.filterByStatus(this.selectedCandidates, this.filterStatuses);
        this.selectedCandidates = this.filterBySalary(this.selectedCandidates, this.minSalary, this.maxSalary);
        this.selectedCandidates = this.filterByAge(this.selectedCandidates,
          this.minYearsRequired, this.maxYearsRequired, this.includeUndefinedBirthday);
      }
      if (this.isSort) {
        console.log('isSort', this.isSort, this.sortedProperty);
        this.selectedCandidates = this.sortByProperty(this.selectedCandidates, this.sortedProperty);
      }
      console.log('selectedCandidates', this.selectedCandidates);
    }
  }
  filterByStatus(candidates: CandidateDashboardItem[], statuses: string[]) {
    if (candidates) {
      if (statuses) {
        return candidates.filter(candidate => {
          return statuses.includes(candidate.candidateState.name);
        });
      } else {
        return candidates;
      }
    }
  }
  filterBySalary(candidates: CandidateDashboardItem[], minSalary: number, maxSalary: number) {
    if (minSalary && maxSalary) {
      return candidates.filter((candidate) => {
        return (candidate.salaryInDollars >= minSalary
          && candidate.salaryInDollars <= maxSalary);
      });
    } else {
      return candidates;
    }
  }
  filterByAge(candidates: CandidateDashboardItem[], minYearsRequired: number, maxYearsRequired: number, includeUndefinedBirthday: boolean) {
    if (minYearsRequired && maxYearsRequired) {
      return candidates.filter(candidate => {
        if (includeUndefinedBirthday) {
          if (candidate.age == null) {
            return true;
          }
        }
        return candidate.age >= minYearsRequired
        && candidate.age <= maxYearsRequired;
      });
    } else {
      return candidates;
    }
  }
  sortByProperty(candidates: CandidateDashboardItem[], property: string): CandidateDashboardItem[] {
    let direction: number;
    this.sortedDirection === SortDirection.ASCENDING ? direction = 1 : direction = -1;
    return candidates.sort((value, value2) => {
      if (property === 'fullname') {
        return this.userWorker.sortByFullname(value, value2) * direction;
      } else if (property === 'age') {
        return this.userWorker.sortByAge(value, value2) * direction;
      } else if (property === 'salaryInDollars') {
        return this.userWorker.sortBySalaryInDollars(value, value2) * direction;
      } else if (property === 'candidateState') {
        return this.userWorker.sortByCandidateState(value, value2) * direction;
      }
    });
  }
  searchValues(value: string) {
    if (value) {
      const valueLowercase = value.toLowerCase();
      this.selectedCandidates = this.candidates.filter((candidate) => {
        const fullname = this.userWorker.formatFullName(candidate).toLowerCase();
        const surname = candidate.surname.toLowerCase();
        return fullname.indexOf(valueLowercase) > -1
          || surname.indexOf(valueLowercase) > -1;
      });
    } else {
      this.selectedCandidates = this.typeCheckingWorker.parseObject(this.candidates);
    }
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
        this.outputAddCandidate.emit(res.resCandidate);
      }
    });
  }

  deleteCandidate(candidateID: number) {
    this.outputDeleteCandidate.emit(candidateID);
  }
  deleteCandidateFromTheBase(candidateID: number) {
    this.outputDeleteCandidateFromTheBase.emit(candidateID);
  }


}
