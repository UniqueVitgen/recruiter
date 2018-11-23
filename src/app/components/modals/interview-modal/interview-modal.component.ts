import {Component, Inject, OnInit} from '@angular/core';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AttachmentDialogData} from '../../../interfaces/dialog/attachment-dialog-data';
import {InterviewDialogData} from '../../../interfaces/dialog/interview-dialog-data';
import {DateTimeWorker} from '../../../workers/date-time/date-time.worker';
import {UserWorker} from '../../../workers/user/user.worker';

@Component({
  selector: 'app-interview-modal',
  templateUrl: './interview-modal.component.html',
  styleUrls: ['./interview-modal.component.scss']
})
export class InterviewModalComponent implements OnInit {

  constructor(
    private candidateService: CandidateService,
    public dialogRef: MatDialogRef<InterviewModalComponent>,
    public dateTimeWorker: DateTimeWorker,
    public userWorker: UserWorker,
    @Inject(MAT_DIALOG_DATA) public data: InterviewDialogData) { }

  ngOnInit() {
  }

}
