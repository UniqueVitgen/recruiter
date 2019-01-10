import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Vacancy} from '../../../../classes/vacancy';
import {JobDescriptionModalComponent} from '../../../modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../../../interfaces/dialog/init/job-description-dialog-data';
import {MatDialog} from '@angular/material';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {VacancyColorService} from '../../../../services/vacancy/vacancy-color.service';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {NumberWorker} from '../../../../workers/number/number.worker';

@Component({
  selector: 'app-job-description-short-info',
  templateUrl: './job-description-short-info.component.html',
  styleUrls: ['./job-description-short-info.component.scss']
})
export class JobDescriptionShortInfoComponent implements OnInit {
  @Input() vacancy: Vacancy;
  @Input() isEdited: boolean;
  @Input() buttonEdit: boolean;
  @Input() buttonDelete: boolean;
  @Output('deleteVacancy') outputDeleteVacancy: EventEmitter<any> = new EventEmitter();
  @Output('changeVacancy') outputChangeVacancy: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog,private vacancyColorService: VacancyColorService, public numberWorker: NumberWorker)  { }

  ngOnInit() {
  }
  openJobDescriptionDialog(): void {
    const dialogRef = this.dialog.open(JobDescriptionModalComponent, {
        data: <JobDescriptionDialogData> {
          sourceJobDescription: this.vacancy,
          isEdit: true,
          dialogWindowTitle: 'Edit'
        },
      minWidth: '700px',
      disableClose: true
      }
    );
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<Vacancy>) => {
      if (res && res.success) {
        this.outputChangeVacancy.emit(res.resObject);
      }
    });
  }
  clickEdit(): void {
    this.openJobDescriptionDialog();
  }
  deleteVacancy() {
    this.outputDeleteVacancy.emit();
  }
}
