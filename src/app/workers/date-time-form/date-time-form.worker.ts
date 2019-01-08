import {Injectable} from '@angular/core';
import {DateInput} from '../../classes/html/dateTime/date-input';
import {DateTimeForm} from '../../classes/html/dateTime/date-time-form';
import {DateTimeWorker} from '../date-time/date-time.worker';
import {InterviewExtended} from '../../classes/interview';

@Injectable({
  providedIn: 'root'
})
export class DateTimeFormWorker {
  constructor(private dateTimeWorker: DateTimeWorker) {
  }
  updateDateTime(editedInterview: InterviewExtended, planDate: DateTimeForm): DateTimeFormResult {
    this.updateDate(planDate);
    this.updateTime(planDate);
    return this.setPlaneDate(editedInterview, planDate);
  }
  updateDate(planDate: DateTimeForm): DateTimeForm {
    if (planDate.dateDate) {
      const dateInput = <DateInput> this.dateTimeWorker.parseDate(planDate.dateDate);
      for (const prop in dateInput) {
        planDate.value[prop] = dateInput[prop];
        planDate.endValue[prop] = dateInput[prop];
      }
      console.log(planDate.value);
      return planDate;
    }
  }
  setPlaneDate(editedInterview: InterviewExtended, planDate: DateTimeForm): DateTimeFormResult {
    if (planDate.value.year && planDate.value.hours) {
      editedInterview.planDate = this.dateTimeWorker.setDateFromDateTimeInput(planDate.value).toISOString();
      editedInterview.planEndDate = this.dateTimeWorker.setDateFromDateTimeInput(planDate.endValue).toISOString();
      return {
        interview: editedInterview,
        planDate: planDate
      };
    }
    // if (editedInterview.planDate > this.editedInterview.planEndDate) {
    //   this.interviewForm.controls.validTime.setValue(false);
    // } else {
    //   this.interviewForm.controls.validTime.setValue(true);
    // }
  }
  updateTime(planDate: DateTimeForm): DateTimeForm {
    for (const prop in planDate.time) {
      planDate.value[prop] = planDate.time[prop];
      planDate.endValue[prop] = planDate.endTime[prop];
    }
    if (planDate.time) {
      planDate.timeString = this.dateTimeWorker.convertTimeInputToTimeString(planDate.time, 24);
    }
    if (planDate.endTime) {
      planDate.endTimeString = this.dateTimeWorker.convertTimeInputToTimeString(planDate.endTime, 24);
    }
    return planDate;
  }
}
export class DateTimeFormResult {
  interview: InterviewExtended;
  planDate: DateTimeForm;
}
