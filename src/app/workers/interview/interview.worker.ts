import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DatePipe} from '@angular/common';
import {InterviewExtended} from '../../classes/interview';
import {CalendarEvent} from '../../classes/html/calendar/calendar-event';
import {DateTimeWorker} from '../date-time/date-time.worker';
import {TranslateWorker} from '../translate/translate.worker';

@Injectable({
  providedIn: 'root'
})
export class InterviewWorker {
  constructor(private dateTimeWorker: DateTimeWorker, private translateWorker: TranslateWorker) {
  }
  convertInterviewListToEventList(interviews: InterviewExtended[]) {
    return interviews.map((interview) => {
      return this.convertInterviewToCalendarEvent(interview);
    });
  }

  convertInterviewToCalendarEvent(interview: InterviewExtended): CalendarEvent {
    const date = new Date(interview.planDate);
    const dateEnd = new Date(date.getTime() + 60 * this.dateTimeWorker.minute);
    return {
      title: interview.vacancy.position + ' - ' + interview.candidate.surname,
      start: this.dateTimeWorker.transform(date, 'yyyy-MM-ddT', 'UTC', this.translateWorker.getLanguage()) + this.dateTimeWorker.getTime(date, 'HH:mm') + ':' + '00' ,
      end: this.dateTimeWorker.transform((dateEnd), 'yyyy-MM-ddT', 'UTC', this.translateWorker.getLanguage()) + this.dateTimeWorker.getTime(dateEnd, 'HH:mm') + ':' + '00',
      candidate: interview.candidate,
      interview: interview,
      vacancy: interview.vacancy
    };
  }
}
