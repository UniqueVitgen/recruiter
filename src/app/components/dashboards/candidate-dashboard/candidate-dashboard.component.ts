import {Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {Candidate, CandidateDashboardItem} from 'src/app/classes/candidate';
import {MatDialog} from '@angular/material';
import {JobDescriptionModalComponent} from '../../modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../../interfaces/dialog/init/job-description-dialog-data';
import {CandidateDialogData} from '../../../interfaces/dialog/init/candidate-dialog-data';
import {CandidateModalComponent} from '../../modals/candidate/candidate-modal/candidate-modal.component';
import {CandidateDialogResult} from '../../../interfaces/dialog/result/candidate-dialog-result';
import {UserWorker} from '../../../workers/user/user.worker';
import {Attachment} from '../../../classes/attachment';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';
import {BootstrapCellEnum} from '../../../enums/bootstrap-cell.enum';
import {ImageCropperAvatarComponent} from '../../modals/candidate/image-cropper-avatar/image-cropper-avatar.component';
import {Vacancy} from '../../../classes/vacancy';

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
        this.selectedCandidates = this.filterByAge(this.selectedCandidates, this.minYearsRequired, this.maxYearsRequired);
        console.log('filtered', this.selectedCandidates);
      }
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
  filterByAge(candidates: CandidateDashboardItem[], minYearsRequired: number, maxYearsRequired: number) {
    if (minYearsRequired && maxYearsRequired) {
      return candidates.filter(candidate => {
        return candidate.age >= minYearsRequired
        && candidate.age <= maxYearsRequired;
      });
    } else {
      return candidates;
    }
  }
  searchValues(value: string) {
    if (value) {
      const valueLowercase = value.toLowerCase();
      this.selectedCandidates = this.candidates.filter((candidate) => {
        const fullname = this.userWorker.formatFullName(candidate).toLowerCase();
        const surname = candidate.surname.toLowerCase();
        return fullname.indexOf(valueLowercase) > -1
          // || name.indexOf(valueLowercase) > -1
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
    // console.log('`Candidate to delete 22:');
    this.outputDeleteCandidate.emit(candidateID);
  }
  deleteCandidateFromTheBase(candidateID: number) {
    // console.log('`Candidate to delete 22:', candidateID);
    this.outputDeleteCandidateFromTheBase.emit(candidateID);
  }


}
