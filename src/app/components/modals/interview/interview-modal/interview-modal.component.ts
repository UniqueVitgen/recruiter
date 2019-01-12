import {ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {InterviewDialogDataInterface} from '../../../../interfaces/dialog/init/interview-dialog-data-interface';
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
import {DeleteCandidateModalComponent} from '../../candidate/delete-candidate-modal/delete-candidate-modal.component';
import {DeleteInterviewModalComponent} from '../delete-interview-modal/delete-interview-modal.component';
import * as moment from 'moment';
import Base = moment.unitOfTime.Base;
import {User} from '../../../../classes/user';

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
  public isCanCompleted: boolean;
  @Output('clickSave') outputClickSave: EventEmitter<BaseDialogResult<InterviewExtended>> = new EventEmitter();
  @Output('clickDelete') outputClickDelete: EventEmitter<BaseDialogResult<InterviewExtended>> = new EventEmitter();
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
    timeString?: string,
    endTime: TimeInput,
    endTimeString?: string,
    value?: DateTimeInput,
    endValue?: DateTimeInput
  } = {dateDate: new Date(),
  time: {hours: 12, minutes: 0},
    endTime: {hours: 13, minutes: 0},
    value: new DateTimeInput(),
    endValue: new DateTimeInput()
  };

  constructor(
    private interviewService: InterviewService,
    private canidateService: CandidateService,
    public dialogRef: MatDialogRef<InterviewModalComponent>,
    public dateTimeWorker: DateTimeWorker,
    public typeCheckingWorker: TypeCheckingWorker,
    public dialog: MatDialog,
    public candidateWorker: CandidateWorker,
    public userWorker: UserWorker,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: InterviewDialogDataInterface ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  getVacancies() {
    this.canidateService.getVacancies(this.editedCandidate).subscribe(resVacancies => {
      this.vacancies = resVacancies;
    });
  }
  getCandidates() {
    this.canidateService.getAll().subscribe(res => {
      this.candidates = res;
    });
  }
  initData() {
    this.minDate = this.dateTimeWorker.getTodayStart();
    if (this.data) {
      if ( this.data.isEdit) {
        this.editedInterview = Object.assign(new Interview(), this.data.sourceInterview);
        this.sourceVacancy = this.editedInterview.vacancy;
        this.editedCandidate = this.editedInterview.candidate;
        this.getVacancies();
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
        this.getVacancies();
      }
      if (this.data.sourceDate) {
        this.planDate.dateDate = new Date(this.data.sourceDate);
        this.planDate.time = this.dateTimeWorker.parseTimeObject(this.data.sourceDate);
        this.planDate.endTime = this.dateTimeWorker.parseTimeObject(this.data.sourceEndDate);
      }
      // this.interviewForm.controls.completed.setValue(true);
    } else {
      this.editedInterview = new Interview();
    }
    this.interviewForm = this.fb.group({
      from: [{value: '', disabled: this.editedInterview.completed}, Validators.compose([Validators.required])],
      fromTime: ['', Validators.compose([Validators.required])],
      toTime: ['', Validators.compose([Validators.required])],
      validTime: [true, Validators.compose([Validators.requiredTrue])],
      candidate: [this.userWorker.formatFullName(this.editedCandidate), Validators.compose([Validators.required])],
      vacancy: ['', Validators.compose([Validators.required])],
      interviewers: ['', Validators.compose([])]
      ,
      completed: [true]
    });
    this.updateDate();
    this.updateTime();
  }
  ngOnInit() {
    // setTimeout(() => {
      this.initData();
    // }, 200);
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
        this.planDate.endValue[prop] = dateInput[prop];
      }
      console.log(this.planDate.value);
    }
    this.setPlaneDate();
  }
  changeCandidate() {
    this.getVacancies();
  }
  setPlaneDate() {
    if (this.planDate.value.year && this.planDate.value.hours) {
      this.editedInterview.planDate = this.dateTimeWorker.setDateFromDateTimeInput(this.planDate.value).toISOString();
      this.editedInterview.planEndDate = this.dateTimeWorker.setDateFromDateTimeInput(this.planDate.endValue).toISOString();
    }
    if (this.editedInterview.planDate > this.editedInterview.planEndDate) {
      this.interviewForm.controls.validTime.setValue(false);
    } else {
      this.interviewForm.controls.validTime.setValue(true);
    }
    const now = this.dateTimeWorker.getNow();
    const completedInterviewTime = new Date(this.editedInterview.planEndDate);
    this.isCanCompleted = completedInterviewTime< now;
    console.log('isCanCompleted', this.isCanCompleted);
  }
  updateTime() {
    for (const prop in this.planDate.time) {
      this.planDate.value[prop] = this.planDate.time[prop];
      this.planDate.endValue[prop] = this.planDate.endTime[prop];
    }
    if (this.planDate.time) {
      this.planDate.timeString = this.dateTimeWorker.convertTimeInputToTimeString(this.planDate.time, 24);
    }
    if (this.planDate.endTime) {
      this.planDate.endTimeString = this.dateTimeWorker.convertTimeInputToTimeString(this.planDate.endTime, 24);
    }
    console.log(this.planDate);
    this.setPlaneDate();
    console.log(this.interviewForm);
  }

  addInterview() {
    this.updateDateTime();
    console.log('editedInterview', this.editedInterview);
    // console.log(this.planDate);
    // console.log('editedInterveiw', this.editedInterview);
    this.editedInterview.candidateId = this.editedCandidate.id;
    this.editedInterview.vacancyId = this.sourceVacancy.id;
    this.outputClickSave.emit({
      resObject: this.editedInterview,
      isEdit: false,
      delete: false,
      success: true
    });
    // this.interviewService.add(this.editedInterview).subscribe(resCandidate => {
    //   this.interviewResult = {
    //     isEdit: false,
    //     resObject: null,
    //     success: true
    //   };
    //   this.dialogRef.close(this.interviewResult);
    // });
  }
  editInterview() {
    console.log('editedInterview', this.editedInterview);
    this.updateDateTime();
    this.editedInterview.candidateId = this.editedCandidate.id;
    this.editedInterview.vacancyId = this.sourceVacancy.id;
    // this.interviewService.update(this.editedInterview).subscribe(resCandidate => {
    //   this.interviewResult = {
    //     isEdit: false,
    //     resObject: null,
    //     success: true
    //   };
    //   this.dialogRef.close(this.interviewResult);
    // });
    this.outputClickSave.emit({
      resObject: this.editedInterview,
      isEdit: true,
      delete: false,
      success: true
    });
  }
  clickDeleteInterview() {
    this.outputClickDelete.emit({
      delete: true,
      success: true,
      resObject: this.editedInterview,
      isEdit: true
    });
    // const dialogRef = this.dialog.open(DeleteInterviewModalComponent, {
    //   width: '400px',
    //   disableClose: true
    // });
    // dialogRef.afterClosed().subscribe(res => {
    //   if (res) {
    //     this.deleteInterview();
    //     // this.candidateService.delete(candidate.id).subscribe(res => {
    //     //   this.getAll();
    //     // });
    //   }
    // });
  }
  deleteInterview() {
    this.interviewService.delete(this.editedInterview).subscribe(res => {
      this.interviewResult = {
        isEdit: false,
        resObject: null,
        success: true,
        delete: true
      };
      this.dialogRef.close(this.interviewResult);
    });
  }

}
