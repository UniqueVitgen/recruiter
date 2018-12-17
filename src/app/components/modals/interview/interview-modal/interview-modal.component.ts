import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InterviewDialogData} from '../../../../interfaces/dialog/init/interview-dialog-data';
import {Interview} from '../../../../classes/interview';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {InterviewService} from '../../../../services/interview/interview.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-interview-modal',
  templateUrl: './interview-modal.component.html',
  styleUrls: ['./interview-modal.component.scss']
})
export class InterviewModalComponent implements OnInit {

  public editedInterview: Interview;
  public interviewResult: BaseDialogResult<Interview>;
  public interviewForm: FormGroup;

  constructor(
    private interviewService: InterviewService,
    public dialogRef: MatDialogRef<InterviewModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InterviewDialogData ) {
    if (this.data.isEdit) {
      this.editedInterview = Object.assign(new Interview(), this.data.sourceInterview);
    } else {
      this.editedInterview = new Interview();
    }
    this.editedInterview.candidateId = this.data.sourceCandidate.id;
    this.interviewForm = this.fb.group({
      from: ['', Validators.compose([Validators.required])],
      to: ['', Validators.compose([Validators.required])]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  addInterview() {
    this.interviewService.add(this.editedInterview).subscribe(resCandidate => {
      this.interviewResult = {
        isEdit: false,
        resObject: null,
        success: true
      };
      this.dialogRef.close(this.interviewResult);
    });
  }

}
