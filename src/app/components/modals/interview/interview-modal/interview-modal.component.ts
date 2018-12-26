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
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';
import {UserWorker} from '../../../../workers/user/user.worker';

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
  public candidates: Candidate[];
  public minDate: Date;
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
    time: TimeInput,
    value?: DateTimeInput
  } = {dateDate: new Date(),
  time: {hours: 12, minutes: 0}, value: new DateTimeInput()};

  constructor(
    private interviewService: InterviewService,
    private canidateService: CandidateService,
    public dialogRef: MatDialogRef<InterviewModalComponent>,
    public dateTimeWorker: DateTimeWorker,
    public typeCheckingWorker: TypeCheckingWorker,
    public userWorker: UserWorker,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: InterviewDialogData ) {
    this.minDate = this.dateTimeWorker.getTodayStart();
    if (this.data) {
      if ( this.data.isEdit) {
        this.editedInterview = Object.assign(new Interview(), this.data.sourceInterview);
        this.sourceVacancy = this.editedInterview.vacancy;
        this.editedCandidate = this.editedInterview.candidate;
        this.getVacanccies();
      } else {
        this.editedInterview = new Interview();
      }
      if (this.data.fixedCandidate) {

      } else {
        this.getCandidates();
      }
      if (this.data.sourceCandidate) {
        this.editedInterview.candidateId = this.data.sourceCandidate.id;
        this.editedCandidate = this.typeCheckingWorker.parseObject(this.data.sourceCandidate);
        this.getVacanccies();
      }
      if (this.data.sourceDate) {
        this.planDate.dateDate = new Date(this.data.sourceDate);
        this.planDate.time = this.dateTimeWorker.parseTimeObject(this.data.sourceDate);
      }
    } else {
      this.editedInterview = new Interview();
    }
    this.interviewForm = this.fb.group({
      from: ['', Validators.compose([Validators.required])],
      fromTime: ['', Validators.compose([Validators.required])],
      to: ['', Validators.compose([Validators.required])]
    });
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
  getCandidates() {
    this.canidateService.getAll().subscribe(res => {
      this.candidates = res;
    });
  }
  ngOnInit() {
  }
  updateDateTime() {
    this.updateDate();
    this.updateTime();
    this.setPlaneDate();
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
  changeCandidate() {
    this.getVacanccies();
  }
  setPlaneDate() {
    if (this.planDate.value.year && this.planDate.value.hours) {
      this.editedInterview.planDate = this.dateTimeWorker.setUTCDate(this.planDate.value.year, this.planDate.value.month, this.planDate.value.day, this.planDate.value.hours, this.planDate.value.minutes).toISOString();
      const timeInput = this.dateTimeWorker.parseTimeString(this.editedInterview.planDate);
    }
  }
  updateTime() {
    for (const prop in this.planDate.time) {
      this.planDate.value[prop] = this.planDate.time[prop];
    }
    console.log(this.planDate.value);
    this.setPlaneDate();
  }

  addInterview() {
    this.updateDateTime();
    console.log(this.planDate);
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
  editInterview() {
    this.updateDateTime();
    this.editedInterview.candidateId = this.editedCandidate.id;
    this.editedInterview.vacancyId = this.sourceVacancy.id;
    this.interviewService.update(this.editedInterview).subscribe(resCandidate => {
      this.interviewResult = {
        isEdit: false,
        resObject: null,
        success: true
      };
      this.dialogRef.close(this.interviewResult);
    });
  }

}
