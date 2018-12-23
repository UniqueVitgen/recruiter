import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterviewTimeline} from '../../../../classes/timeline/interview-timeline';
import {Interview} from '../../../../classes/interview';
import {DateTimeWorker} from '../../../../workers/date-time/date-time.worker';
import {DateTimeForm} from '../../../../classes/html/dateTime/date-time-form';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';
import {TimeInput} from '../../../../classes/html/dateTime/time-input';
import {DateInput} from '../../../../classes/html/dateTime/date-input';

@Component({
  selector: 'app-interview-candidate-timeline-item',
  templateUrl: './interview-candidate-timeline-item.component.html',
  styleUrls: ['./interview-candidate-timeline-item.component.scss']
})
export class InterviewCandidateTimelineItemComponent implements OnInit {
  @Input() interview: Interview;
  @Output() changeCandidate: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
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

  constructor(private dateTimeWorker: DateTimeWorker) {
  }
  ngOnInit() {
    this.editedInterview = Object.assign({}, this.interview);
    this.viewOfDate = this.dateTimeWorker.getDateWithTime(this.editedInterview.createdAt);
    this.planDate = this.dateTimeWorker.parseDateToDateTimeForm(new Date(this.editedInterview.planDate));
  }
  onFocusoutAnyInput(value: boolean = true) {
    console.log('timeString', this.planDate.timeString);
    this.updateDateTime();
    if (value) {
      console.log('exp', this.editedInterview);
      this.changeCandidate.emit(this.editedInterview);
    }
  }
  delete() {
    this.deleteEvent.emit(this.editedInterview);
  }
  updateTime() {
    const timeInput = <TimeInput> this.dateTimeWorker.parseTimeString(this.planDate.timeString);
    for (const prop in timeInput) {
      this.planDate.value[prop] = timeInput[prop];
    }
    console.log(this.planDate.value);
    this.setPlaneDate();
  }
  setPlaneDate() {
    if (this.planDate.value.year && this.planDate.value.hours) {
      this.editedInterview.planDate = new Date(this.planDate.value.year, this.planDate.value.month, this.planDate.value.day, this.planDate.value.hours, this.planDate.value.minutes).toISOString();
      const timeInput = this.dateTimeWorker.parseTimeString(this.editedInterview.planDate)
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

}
