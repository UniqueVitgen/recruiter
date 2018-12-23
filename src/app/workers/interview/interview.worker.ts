import {Inject, Injectable, LOCALE_ID} from '@angular/core';
import {DatePipe} from '@angular/common';
import {InterviewExtended} from '../../classes/interview';
import {CalendarEvent} from '../../classes/html/calendar/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class InterviewWorker {
  convertInterviewToEvent(intrviews: InterviewExtended) {

  }

  // convertInterviewToCalendarEvent(interview: InterviewExtended): CalendarEvent {
  //   return {
  //     title: interview.vacancy.position + ' - ' + interview.candidate.surname,
  //     start: interview.planDate
  //   }
  // }
}
