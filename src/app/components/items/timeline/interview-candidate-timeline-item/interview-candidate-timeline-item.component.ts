import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {InterviewTimeline} from '../../../../classes/timeline/interview-timeline';
import {Interview} from '../../../../classes/interview';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {DateTimeForm} from '../../../../classes/html/dateTime/date-time-form';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';
import {TimeInput} from '../../../../classes/html/dateTime/time-input';
import {DateInput} from '../../../../classes/html/dateTime/date-input';
import {TranslateWorker} from '../../../../workers/translate/translate.worker';
import {LocalDatePipe} from '../../../../pipes/local-date/local-date.pipe';

@Component({
  selector: 'app-interview-candidate-timeline-item',
  templateUrl: './interview-candidate-timeline-item.component.html',
  styleUrls: ['./interview-candidate-timeline-item.component.scss']
})
export class InterviewCandidateTimelineItemComponent implements OnInit, OnChanges {
  @Input() interview: Interview;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  time: TimeInput;
  planDate: DateTimeForm;
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

  editedInterview: Interview;
  viewOfDate: string;
  viewOfTime: string;

  constructor(private dateTimeWorker: DateTimeWorker, private translateWorker: TranslateWorker, private localDatePipe: LocalDatePipe) {
  }
  ngOnInit() {
    this.editedInterview = Object.assign({}, this.interview);
    this.viewOfDate = this.localDatePipe.transform(this.editedInterview.createdAt, null);
    this.viewOfTime = this.localDatePipe.transform(this.editedInterview.createdAt, 'shortTime');
    this.planDate = this.dateTimeWorker.parseDateToDateTimeForm(new Date(this.editedInterview.planDate));
    this.translateWorker.changeValue.subscribe(res => {
      // this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedInterview.createdAt);
      this.viewOfDate = this.localDatePipe.transform(this.editedInterview.createdAt, null);
      this.viewOfTime = this.localDatePipe.transform(this.editedInterview.createdAt, 'shortTime');
    });
  }
  onFocusoutAnyInput(value: boolean = true) {
    this.updateDateTime();
    if (value) {
      console.log('exp', this.editedInterview);
      this.changeCandidate.emit(this.editedInterview);
    }
  }
  delete() {
    this.deleteEvent.emit(this.editedInterview);
  }
  changeTime() {
    console.log('time', this.time);
  }
  updateTime() {
    for (const prop in this.planDate.time) {
      this.planDate.value[prop] = this.planDate.time[prop];
    }
    console.log(this.planDate.value);
    this.setPlaneDate();
  }
  setPlaneDate() {
    if (this.planDate.value.year && this.planDate.value.hours) {
      this.editedInterview.planDate = new Date(this.planDate.value.year, this.planDate.value.month, this.planDate.value.day, this.planDate.value.hours, this.planDate.value.minutes).toISOString();
      const timeInput = this.dateTimeWorker.parseTimeString(this.editedInterview.planDate);
    }
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log('getDate');
    // if (this.editedInterview) {
    //   this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedInterview.createdAt);
    // }
  }

}
