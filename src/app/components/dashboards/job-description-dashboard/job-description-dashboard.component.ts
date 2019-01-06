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
  @Output('addVacancy') outputAddVacancy: EventEmitter<Vacancy> = new EventEmitter();
  @Input() search;
  @Output('deleteVacancy') outputDeleteVacancy: EventEmitter<any> = new EventEmitter();
  @Input() itemsPerPageValues: number[];
  @Input() isPagination: boolean;
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
    console.log('job description');
    this.router.navigate(['job-description', vacancy.id]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.searchValues(this.search);
  }

  searchValues(value: string) {
    if (value) {
      const valueLowercase = value.toLowerCase();
      this.selectedVacancies = this.jobDescriptionList.filter((vacancy) => {
        const position = vacancy.position.name.toLowerCase();
        return position.indexOf(valueLowercase) > -1;
      });
    } else {
      this.selectedVacancies = this.jobDescriptionList;
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
