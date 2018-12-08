import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from '../../../../classes/vacancy';
import {JobDescriptionModalComponent} from '../../../modals/job-description/job-description-modal/job-description-modal.component';
import {JobDescriptionDialogData} from '../../../../interfaces/dialog/init/job-description-dialog-data';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-job-description-short-info',
  templateUrl: './job-description-short-info.component.html',
  styleUrls: ['./job-description-short-info.component.scss']
})
export class JobDescriptionShortInfoComponent implements OnInit {
  @Input() vacancy: Vacancy;
  @Input() isEdited: boolean;

  constructor(public dialog: MatDialog)  { }

  ngOnInit() {
  }
  openJobDescriptionDialog(): void {
    const dialogRef = this.dialog.open(JobDescriptionModalComponent, {
        data: <JobDescriptionDialogData> {
          sourceJobDescription: this.vacancy,
          isEdit: true
        }
      }
    );
  }
  clickEdit() {
    this.openJobDescriptionDialog();
  }
}
