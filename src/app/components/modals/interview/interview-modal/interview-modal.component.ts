import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {InterviewDialogData} from '../../../../interfaces/dialog/init/interview-dialog-data';
import {Interview, InterviewExtended} from '../../../../classes/interview';
import {BaseDialogResult} from '../../../../interfaces/dialog/result/base-dialog-result';
import {InterviewService} from '../../../../services/interview/interview.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {DateTimeInput} from '../../../../classes/html/dateTime/date-time-input';
import {DateInput} from '../../../../classes/html/dateTime/date-input';
import {TimeInput} from '../../../../classes/html/dateTime/time-input';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {Vacancy} from '../../../../classes/vacancy';
import {Candidate} from '../../../../classes/candidate';
import {TypeCheckingWorker} from '../../../../workers/type-checking/type-checking.worker';

@Component({
  selector: 'app-interview-modal',
  templateUrl: './interview-modal.component.html',
  styleUrls: ['./interview-modal.component.scss']
})
export class InterviewModalComponent implements OnInit {
  public editedCandidate: Candidate;
  public editedInterview: InterviewExtended;
  public interviewResult: BaseDialogResult<Interview>;
  public interviewForm: FormGroup;
  public vacancies: Vacancy[];
  public sourceVacancy: Vacancy;
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
  planDate: {
    dateDate: Date,
    timeString: string,
    value?: DateTimeInput
  } = {dateDate: new Date(),
  timeString: '12:00', value: new DateTimeInput()};

  constructor(
    private interviewService: InterviewService,
    private canidateService: CandidateService,
    public dialogRef: MatDialogRef<InterviewModalComponent>,
    private dateTimeWorker: DateTimeWorker,
    private typeCheckingWorker: TypeCheckingWorker,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InterviewDialogData ) {
    if (this.data) {
      if ( this.data.isEdit) {
        this.editedInterview = Object.assign(new Interview(), this.data.sourceInterview);
      } else {
        this.editedInterview = new Interview();
      }
      this.editedInterview.candidateId = this.data.sourceCandidate.id;
      this.editedCandidate = this.typeCheckingWorker.parseObject(this.data.sourceCandidate);
    } else {
      this.editedInterview = new Interview();
    }
    this.interviewForm = this.fb.group({
      from: ['', Validators.compose([Validators.required])],
      fromTime: ['', Validators.compose([Validators.required])],
      to: ['', Validators.compose([Validators.required])]
    });
    this.getVacanccies();
    this.updateDate();
    this.updateTime();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getVacanccies() {
    this.canidateService.getVacancies(this.editedCandidate).subscribe(resVacancies => {
      this.vacancies = resVacancies;
    });
  }
  ngOnInit() {
  }
  updateDate() {
    if (this.planDate.dateDate) {
      const dateInput = <DateInput> this.dateTimeWorker.parseDate(this.planDate.dateDate);
      for (const prop in dateInput) {
        this.planDate.value[prop] = dateInput[prop];
      }
      console.log(this.planDate.value);
    }
    this.setPlaneDate();
  }
  setPlaneDate() {
    this.editedInterview.planDate = new Date(this.planDate.value.year, this.planDate.value.month, this.planDate.value.day, this.planDate.value.hours, this.planDate.value.minutes).toDateString();
  }
  updateTime() {
    const timeInput = <TimeInput> this.dateTimeWorker.parseTimeString(this.planDate.timeString);
    for (const prop in timeInput) {
      this.planDate.value[prop] = timeInput[prop];
    }
    console.log(this.planDate.value);
    this.setPlaneDate();
  }

  addInterview() {
    console.log('editedInterveiw', this.editedInterview);
    this.editedInterview.candidateId = this.editedCandidate.id;
    this.editedInterview.vacancyId = this.sourceVacancy.id;
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
