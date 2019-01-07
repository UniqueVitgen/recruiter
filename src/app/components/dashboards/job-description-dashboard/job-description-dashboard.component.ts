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
  @Output('deleteVacancy') outputDeleteVacancy: EventEmitter<any> = new EventEmitter();
  @Output('addVacancy') outputAddVacancy: EventEmitter<Vacancy> = new EventEmitter();
  showInfoAndDeleteIcon: boolean = false;
  @HostListener('mouseenter') setShowInfoAndDeleteIcon(){
    this.showInfoAndDeleteIcon = !this.showInfoAndDeleteIcon;
  }
  itemsPerPage: number = 5;
  p: number = 1;
  isClosedIcon: boolean = false;
  public selectedVacancies: Vacancy[];

  constructor(
    public dialog: MatDialog,
    private router: Router,
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
      this.selectedVacancies = this.filterBySalary(this.selectedVacancies, this.minSalary, this.maxSalary);
      this.selectedVacancies = this.filterByYearsRequire(this.selectedVacancies, this.minYearsRequired, this.maxYearsRequired);
    }
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
    if (minSalary && maxSalary) {
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
    if (minYearsRequired && maxYearsRequired) {
      return vacancies.filter((vacancy) => {
        return (vacancy.experienceYearsRequire >= minYearsRequired
          && vacancy.experienceYearsRequire <= maxYearsRequired);
      });
    } else {
      return vacancies;
    }
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
          this.outputAddVacancy.emit(res.resObject);
        }
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
