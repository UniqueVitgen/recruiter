import {Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, HostListener} from '@angular/core';
import {Vacancy} from '../../../classes/vacancy';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {JobDescriptionModalComponent} from '../../modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../../interfaces/dialog/init/job-description-dialog-data';
import {BaseDialogResult} from '../../../interfaces/dialog/result/base-dialog-result';
import {DeleteVacancyDialogComponent} from '../../modals/delete-vacancy-dialog/delete-vacancy-dialog.component';
import {VacancyColorService} from '../../../services/vacancy/vacancy-color.service';
import {AlertWithButtonModalComponent} from '../../modals/alert-with-button-modal/alert-with-button-modal.component';
import {AlertWithButtonDialogData} from '../../../interfaces/dialog/init/alert-with-button-dialog-data';
import {CandidateDashboardItem} from '../../../classes/candidate';
import {SortDirection} from '../../../enums/sort-direction.enum';
import {VacancyWorker} from '../../../workers/vacancy/vacancy.worker';

@Component({
  selector: 'app-job-description-dashboard',
  templateUrl: './job-description-dashboard.component.html',
  styleUrls: ['./job-description-dashboard.component.scss']
})
export class JobDescriptionDashboardComponent implements OnInit, OnChanges {
  @Input() jobDescriptionList: Vacancy[];
  @Input() search;
  @Input() itemsPerPageValues: number[];
  @Input() isPagination: boolean;
  @Input() isFilter: boolean;
  @Input() filterStatuses: string[];
  @Input() minSalary: number;
  @Input() maxSalary: number;
  @Input() minYearsRequired: number;
  @Input() maxYearsRequired: number;
  @Input() includeUndefinedSalary: boolean;
  @Input() includeUndefinedYearsRequired: boolean;
  @Input() validSalaryFilter: boolean;
  @Input() validYearsRequiredFilter: boolean;
  @Input() idPagination: number;
  @Output('deleteVacancy') outputDeleteVacancy: EventEmitter<any> = new EventEmitter();
  @Output('addVacancy') outputAddVacancy: EventEmitter<Vacancy> = new EventEmitter();
  showInfoAndDeleteIcon: boolean = false;
  @HostListener('mouseenter') setShowInfoAndDeleteIcon(){
    this.showInfoAndDeleteIcon = !this.showInfoAndDeleteIcon;
  }
  @Input() itemsPerPage: number;
  @Input() p: number;
  @Input() isSort: boolean;
  @Input() sortedProperty: string;
  @Input() sortedDirection: SortDirection;
  @Output('changeFilteredLength') outputChangeFilteredLength: EventEmitter<number> = new EventEmitter();
  isClosedIcon: boolean = false;
  public selectedVacancies: Vacancy[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private vacancyWorker: VacancyWorker,
    private vacancyColorService: VacancyColorService) {
  }

  ngOnInit() {
  }

  goToJobDescriptionPage(vacancy: Vacancy) {
    this.router.navigate(['job-description', vacancy.id]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedVacancies = this.searchValues(this.search);
    if (this.isFilter) {
      this.selectedVacancies = this.filterByStatus(this.selectedVacancies, this.filterStatuses);
      if (this.validSalaryFilter) {
        this.selectedVacancies = this.filterBySalary(this.selectedVacancies, this.minSalary, this.maxSalary, this.includeUndefinedSalary);
      }
      if (this.validYearsRequiredFilter) {
        this.selectedVacancies = this.filterByYearsRequire(this.selectedVacancies, this.minYearsRequired, this.maxYearsRequired,
          this.includeUndefinedYearsRequired);
      }
    }
    if (this.isSort) {
      console.log('isSort', this.isSort, this.sortedProperty);
      this.selectedVacancies = this.sortByProperty(this.selectedVacancies, this.sortedProperty);
    }
    this.outputChangeFilteredLength.emit(this.selectedVacancies.length);
    console.log('selectedVacancies', this.selectedVacancies);
  }

  searchValues(value: string): Vacancy[] {
    let selectedVacancy: Vacancy[];
    if (value) {
      const valueLowercase = value.toLowerCase();
      selectedVacancy = this.jobDescriptionList.filter((vacancy) => {
        const position = vacancy.position.name.toLowerCase();
        return position.indexOf(valueLowercase) > -1;
      });
    } else {
      selectedVacancy = this.jobDescriptionList;
    }
    return selectedVacancy;
  }
  filterByStatus(vacancies: Vacancy[], statuses: string[]) {
    if (vacancies) {
      return vacancies.filter(vacancy => {
        return statuses.includes(vacancy.vacancyState);
      });
    }
  }
  filterBySalary(vacancies: Vacancy[], minSalary: number, maxSalary: number, includeUndefinedSalary: boolean) {
    if (minSalary != null && maxSalary != null) {
      return vacancies.filter((vacancy) => {
        if (includeUndefinedSalary) {
          if (vacancy.salaryInDollarsTo == null && vacancy.salaryInDollarsFrom == null) {
            return true;
          }
        }
        return (minSalary <= vacancy.salaryInDollarsTo
          && maxSalary >= vacancy.salaryInDollarsTo)
          ||
          (minSalary >= vacancy.salaryInDollarsFrom
            && maxSalary <= vacancy.salaryInDollarsFrom)
          || (minSalary <= vacancy.salaryInDollarsFrom
            && minSalary >= vacancy.salaryInDollarsTo)
          ||
          (maxSalary >= vacancy.salaryInDollarsFrom
            && maxSalary <= vacancy.salaryInDollarsTo);
      });
    } else {
      return vacancies;
    }
  }
  filterByYearsRequire(vacancies: Vacancy[], minYearsRequired: number, maxYearsRequired: number, includeUndefinedYearsRequired: boolean) {
    if (minYearsRequired != null && maxYearsRequired != null) {
      return vacancies.filter((vacancy) => {
        if (includeUndefinedYearsRequired) {
          if (vacancy.experienceYearsRequire == null) {
            return true;
          }
        }
        return (vacancy.experienceYearsRequire >= minYearsRequired
          && vacancy.experienceYearsRequire <= maxYearsRequired);
      });
    } else {
      return vacancies;
    }
  }
  sortByProperty(vacancies: Vacancy[], property: string): Vacancy[] {
    let direction: number;
    this.sortedDirection === SortDirection.ASCENDING ? direction = 1 : direction = -1;
    return this.vacancyWorker.sortByProperty(vacancies, property, direction);
  }

  openDeleteVacancyDialog(vacancyID: number): void {
    console.log(vacancyID);
    const dialogRef = this.dialog.open(AlertWithButtonModalComponent, {
      data: <AlertWithButtonDialogData> {
        buttonText: 'Delete',
        message: 'Do you really want to delete this vacancy?',
        title: 'Confirm delete'
      },
      disableClose: true
    });
    dialogRef.componentInstance.outputClickOk.subscribe((resAnswer: boolean) => {
      if (resAnswer) {
        this.deleteVacancy(vacancyID);
      }
    });

  }


  deleteVacancy(index: number) {
    this.outputDeleteVacancy.emit(index);
  }

}
