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
    console.log('2', this.p, this.itemsPerPage);
    this.selectedVacancies = this.searchValues(this.search);
    if (this.isFilter) {
      this.selectedVacancies = this.filterByStatus(this.selectedVacancies, this.filterStatuses);
      this.selectedVacancies = this.filterBySalary(this.selectedVacancies, this.minSalary, this.maxSalary);
      this.selectedVacancies = this.filterByYearsRequire(this.selectedVacancies, this.minYearsRequired, this.maxYearsRequired);
    }
    if (this.isSort) {
      console.log('isSort', this.isSort, this.sortedProperty);
      this.selectedVacancies = this.sortByProperty(this.selectedVacancies, this.sortedProperty);
    }
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
  filterBySalary(vacancies: Vacancy[], minSalary: number, maxSalary: number) {
    if (minSalary != null && maxSalary != null) {
      return vacancies.filter((vacancy) => {
        return (vacancy.salaryInDollarsFrom >= minSalary
          && vacancy.salaryInDollarsFrom <= maxSalary)
          ||
          (vacancy.salaryInDollarsTo >= minSalary
            && vacancy.salaryInDollarsTo <= maxSalary);
      });
    } else {
      return vacancies;
    }
  }
  filterByYearsRequire(vacancies: Vacancy[], minYearsRequired: number, maxYearsRequired: number) {
    if (minYearsRequired != null && maxYearsRequired != null) {
      return vacancies.filter((vacancy) => {
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
    return vacancies.sort((value, value2) => {
      if (property === 'position') {
        return this.vacancyWorker.sortByPosition(value, value2) * direction;
      } else if (property === 'vacancyState') {
        return this.vacancyWorker.sortByVacancyState(value, value2) * direction;
      } else if (property === 'salaryInDollarsFrom') {
        return this.vacancyWorker.sortBySalaryInDollarsFrom(value, value2) * direction;
      } else if (property === 'salaryInDollarsTo') {
        return this.vacancyWorker.sortBySalaryInDollarsTo(value, value2) * direction;
      } else if (property === 'experienceYearsRequire') {
        console.log('experienceYearsRequire', value.experienceYearsRequire, value2.experienceYearsRequire);
        return this.vacancyWorker.sortByExperienceYearsRequire(value, value2) * direction;
      } else if (property === 'candidates') {
        return this.vacancyWorker.sortByCandidates(value, value2) * direction;
      }
    });
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
