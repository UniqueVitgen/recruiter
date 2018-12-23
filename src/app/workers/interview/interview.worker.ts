import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DatePipe} from '@angular/common';
import {InterviewExtended} from '../../classes/interview';
import {CalendarEvent} from '../../classes/html/calendar/calendar-event';
import {DateTimeWorker} from '../date-time/date-time.worker';

@Injectable({
  providedIn: 'root'
})
export class InterviewWorker {
  constructor(private dateTimeWorker: DateTimeWorker) {
  }
  convertInterviewListToEventList(interviews: InterviewExtended[]) {
    return interviews.map((interview) => {
      return this.convertInterviewToCalendarEvent(interview);
    });
  }

  convertInterviewToCalendarEvent(interview: InterviewExtended): CalendarEvent {
    const date = new Date(interview.planDate);
    return {
      title: interview.vacancy.position + ' - ' + interview.candidate.surname,
      start: interview.planDate,
      end: new Date(date.getTime() + 30 * this.dateTimeWorker.minute).toISOString(),
      candidate: interview.candidate,
      interview: interview,
      vacancy: interview.vacancy
    };
  }
}
