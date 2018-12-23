import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InterviewDialogData} from '../../../../interfaces/dialog/init/interview-dialog-data';
import {Interview} from '../../../../classes/interview';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {InterviewService} from '../../../../services/interview/interview.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';

@Component({
  selector: 'app-interview-modal',
  templateUrl: './interview-modal.component.html',
  styleUrls: ['./interview-modal.component.scss']
})
export class InterviewModalComponent implements OnInit {

  public editedInterview: Interview;
  public interviewResult: BaseDialogResult<Interview>;
  public interviewForm: FormGroup;
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      // bodyBackgroundColor: '#424242',
      buttonColor: '#4285f4'
    },
    dial: {
      dialBackgroundColor: '#4285f4',
    },
    clockFace: {
      // clockFaceBackgroundColor: '#555',
      clockHandColor: '#4285f4',
      // clockFaceTimeInactiveColor: '#fff'
    }
  };

  constructor(
    private interviewService: InterviewService,
    public dialogRef: MatDialogRef<InterviewModalComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InterviewDialogData ) {
    if (this.data) {
      if ( this.data.isEdit) {
        this.editedInterview = Object.assign(new Interview(), this.data.sourceInterview);
      } else {
        this.editedInterview = new Interview();
      }
      this.editedInterview.candidateId = this.data.sourceCandidate.id;
    } else {
      this.editedInterview = new Interview();
    }
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
  updateTime(event) {
    console.log(event);
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
