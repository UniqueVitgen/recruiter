import {Component, Input, OnInit} from '@angular/core';
import {Vacancy} from '../../../../classes/vacancy';
import {StatusCandidateModalComponent} from '../../../modals/candidate/status-candidate-modal/status-candidate-modal.component';
import {MatDialog} from '@angular/material';
import {JobDescriptionDialogData} from '../../../../interfaces/dialog/init/job-description-dialog-data';
import {JobDescriptionModalComponent} from '../../../modals/job-description/job-description-modal/job-description-modal.component';

@Component({
  selector: 'app-job-description-requirements',
  templateUrl: './job-description-requirements.component.html',
  styleUrls: ['./job-description-requirements.component.scss']
})
export class JobDescriptionRequirementsComponent implements OnInit {
  @Input() vacancy: Vacancy;
  @Input() isMoreIcon: boolean;

  constructor(public dialog: MatDialog) { }

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
