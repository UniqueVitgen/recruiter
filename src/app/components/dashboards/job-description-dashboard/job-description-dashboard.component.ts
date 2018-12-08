import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Vacancy} from '../../../classes/vacancy';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { JobDescriptionModalComponent } from '../../modals/job-description/job-description-modal/job-description-modal.component';
import { JobDescriptionDialogData } from '../../../interfaces/dialog/init/job-description-dialog-data';
import { BaseDialogResult } from '../../../interfaces/dialog/result/base-dialog-result';

@Component({
  selector: 'app-job-description-dashboard',
  templateUrl: './job-description-dashboard.component.html',
  styleUrls: ['./job-description-dashboard.component.scss']
})
export class JobDescriptionDashboardComponent implements OnInit {
  @Input() jobDescriptionList: Vacancy[];
  @Output('addVacancy') outputAddVacancy: EventEmitter<Vacancy> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
  }

  goToJobDescriptionPage(vacancy: Vacancy) {
    console.log('job description');
    this.router.navigate(['job-description', vacancy.id]);
  }

  

  openJobDescriptionDialog(): void {
    console.log('i');
    const dialogRef = this.dialog.open(JobDescriptionModalComponent, {
        data: <JobDescriptionDialogData> {
          sourceJobDescription: null,
          isEdit: false
        }
      }
    );
    dialogRef.afterClosed().subscribe((res: BaseDialogResult<Vacancy>) => {
      if(res) {
        if(res.success) {
          this.outputAddVacancy.emit(res.resObject);
        }
      }
    })
  }

}
