import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';

import * as $ from 'jquery';
import * as moment from 'moment';
// import {Duration, Moment} from 'moment';
import {MatDialog} from '@angular/material';
import {InterviewModalComponent} from '../../modals/interview/interview-modal/interview-modal.component';
import {InterviewExtended} from '../../../classes/interview';
import {Vacancy} from '../../../classes/vacancy';
import {VacancyState} from '../../../enums/vacancy-state.enum';
import {Candidate} from '../../../classes/candidate';
import {ContactType} from '../../../enums/contact-type.enum';
import {AttachmentType} from '../../../enums/attachment-type.enum';
import {VacancyService} from '../../../services/vacancy/vacancy.service';
import {CandidateService} from '../../../services/candidate/candidate.service';
import {InterviewService} from '../../../services/interview/interview.service';
import {DateTimeWorker} from '../../../workers/date-time/date-time.worker';
import {CalendarComponent} from 'ng-fullcalendar';
// import { Options } from 'fullcalendar';
import {CalendarEvent} from '../../../classes/html/calendar/calendar-event';
import {InterviewWorker} from '../../../workers/interview/interview.worker';
import {InterviewDialogDataInterface} from '../../../interfaces/dialog/init/interview-dialog-data-interface';
import {TranslateWorker} from '../../../workers/translate/translate.worker';
import {AlertModalComponent} from '../../modals/alert-modal/alert-modal.component';
import {AlertDialogData} from '../../../interfaces/dialog/init/alert-dialog-data';
import {TypeCheckingWorker} from '../../../workers/type-checking/type-checking.worker';
import {Router} from '@angular/router';
import {InterviewCalendarEvent} from '../../../classes/event/interview-calendar-event';
// import {  } from 'fullcalendar';
// import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';


@Component({
  selector: 'app-interview-calendar',
  templateUrl: './interview-calendar.component.html',
  styleUrls: ['./interview-calendar.component.scss']
})
export class InterviewCalendarComponent implements OnInit, OnChanges {
  @Input() inteviews: InterviewExtended[];
  @Input() locale: string;
  @Output('changeInterviews') outputChangeInterviews: EventEmitter<any> = new EventEmitter();
  @Output('clickDay') outputClickDay: EventEmitter<InterviewCalendarEvent> = new EventEmitter();
  @Output('clickEvent') outputClickEvent: EventEmitter<InterviewCalendarEvent> = new EventEmitter();
  @Output('dropEvent') outputDropEvent: EventEmitter<InterviewCalendarEvent> = new EventEmitter();
  // options: FullCalendarOptions;
  // events: EventObject[];
  options;
  public calendarEventList: CalendarEvent[];
  public calendarOptions = <any>{
    allDaySlot: false,
    allDayDefault: false,
    editable: true,
    eventLimit: false,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listMonth'
    },
    eventTextColor: '#fff',
    eventColor: '#4285f4',
    timeFormat: 'H:mm',
    nowIndicator: true,
    slotLabelFormat: 'H:mm'
    ,
    timezone: 'UTC',
    minTime: <any> '08:00:00',
    maxTime: <any> '23:00:00',
    visibleRange: {
      start: this.dateTimeWorker.getYesterday(),
      end: this.dateTimeWorker.getNextYear()
    }
  };
  // public calendarOptions2: Object = {
  //   height: 'parent',
  //   fixedWeekCount : false,
  //   defaultDate: '2016-09-12',
  //   editable: true,
  //   eventLimit: true, // allow "more" link when too many events
  //   events: [
  //     {
  //       title: 'All Day Event',
  //       start: '2016-09-01'
  //     },
  //     {
  //       title: 'Long Event',
  //       start: '2016-09-07',
  //       end: '2016-09-10'
  //     },
  //     {
  //       id: 999,
  //       title: 'Repeating Event',
  //       start: '2016-09-09T16:00:00'
  //     },
  //     {
  //       id: 999,
  //       title: 'Repeating Event',
  //       start: '2016-09-16T16:00:00'
  //     },
  //     {
  //       title: 'Conference',
  //       start: '2016-09-11',
  //       end: '2016-09-13'
  //     },
  //     {
  //       title: 'Meeting',
  //       start: '2016-09-12T10:30:00',
  //       end: '2016-09-12T12:30:00'
  //     },
  //     {
  //       title: 'Lunch',
  //       start: '2016-09-12T12:00:00'
  //     },
  //     {
  //       title: 'Meeting',
  //       start: '2016-09-12T14:30:00'
  //     },
  //     {
  //       title: 'Happy Hour',
  //       start: '2016-09-12T17:30:00'
  //     },
  //     {
  //       title: 'Dinner',
  //       start: '2016-09-12T20:00:00'
  //     },
  //     {
  //       title: 'Birthday Party',
  //       start: '2016-09-13T07:00:00'
  //     },
  //     {
  //       title: 'Click for Google',
  //       url: 'http://google.com/',
  //       start: '2016-09-28'
  //     }
  //   ]
  // };
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private dialog: MatDialog,
              private vacancyService: VacancyService,
              private candidateService: CandidateService,
              public dateTimeWorker: DateTimeWorker,
              public typeCheckingWorker: TypeCheckingWorker,
              private interviewWorker: InterviewWorker,
              public translateWorker: TranslateWorker,
              public router: Router,
              private interviewService: InterviewService) {
    // this.selected  = this.MONTH;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' ) {
      // this.prevMonth();
    }
    if (event.key === 'ArrowRight' ) {
      // this.nextMonth();
    }
  }
  determineOptions() {{
    let buttonText, firstDay;
    if (this.locale === 'ru') {
      buttonText = {
        month:    'Месяц',
        // today:    '>',
        week:     'Неделя',
        day:      'Лист',
        list:     'Список'
      };
      firstDay = 1;
    } else {
      buttonText = {
        month:    'Month',
        // today:    'Today',
        week:     'Week',
        day:      'Day',
        list:     'List'
      };
      firstDay = 0;
    }
    return {
      allDaySlot: false,
      allDayDefault: false,
      minTime: <any> '08:00:00',
      maxTime: <any> '23:00:00',
      locale: this.locale,
      buttonText: buttonText,
      firstDay: firstDay,
      theme: 'bootstrap4',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      bootstrapGlyphicons: {
        today: 'glyphicon-repeat'
      },
      // theme: 'bootstrap4',
      editable: true,
      dateClick: (e) => {
        this.addInterview(e);
      },
      eventClick: (e) => {
        // this.goToInterviewPage(e);
        this.clickInterview(e);
      },
      eventDrop: (e) => {
        this.dropInterview(e);
      }
    };
  }
  }
  addInterview(event) {
    console.log('add interview', event);
    console.log('event.detail.date', event.date);
    const dateEvent: Date =  event.date;
    this.outputClickDay.emit({
      targetDate: dateEvent
    });
    // if (dateEvent.getTime() > todayStart.getTime()) {
    //   const dialogRef = this.dialog.open(InterviewModalComponent, {
    //     data: <InterviewDialogDataInterface> {
    //       sourceDate: event.date,
    //       fixedCandidate: false,
    //       isEdit: false
    //     }
    //   });
    //   // dialogRef.afterClosed().subscribe(res => {
    //   //   this.outputChangeInterviews.emit(null);
    //   // });
    // } else {
    //   const dialogRef = this.dialog.open(AlertModalComponent, {
    //     data: <AlertDialogData> {
    //       title: this.translateWorker.translateWord('Past dates are disabled!'),
    //       message: this.translateWorker.translateWord('You can\'t add events on Past dates.')
    //     }
    //   });
    // }
  }
  clickInterview(event) {
    this.outputClickEvent.emit({
      targetDate: event.event.extendedProps.interview.planDate,
      interview: event.event.extendedProps.interview
    });
    console.log('change event', event);
    // const dialogRef = this.dialog.open(InterviewModalComponent, {
    //   data: <InterviewDialogDataInterface> {
    //     sourceDate: event.event.extendedProps.interview.planDate,
    //     fixedCandidate: false,
    //     isEdit: true,
    //     sourceInterview: event.event.extendedProps.interview
    //   }
    // });
    // dialogRef.afterClosed().subscribe(res => {
    //   this.outputChangeInterviews.emit(null);
    // });
  }
  goToInterviewPage(event) {
    const interview = event.event.extendedProps.interview;
    this.router.navigate(['interview', interview.id]);
  }
  dropInterview(event) {
    console.log('drop Interview', event);
    this.outputDropEvent.emit({
      targetDate: event.event.start,
      interview: event.event.def.extendedProps.interview
    });
    // if (event) {
    //   const startTime: Date = event.event.start;
    //   console.log(event.event.start.getUTCHours());
    //   console.log(event.event.start.getHours());
    //   if (startTime.getTime() > this.dateTimeWorker.getTodayStart().getTime()) {
    //     const interview: InterviewExtended  = event.event.def.extendedProps.interview;
    //     interview.planDate = this.dateTimeWorker.setUTCDate(startTime.getFullYear(),
    //       startTime.getMonth(), startTime.getDate(), startTime.getHours(),
    //       startTime.getMinutes()).toISOString();
    //     this.outputChangeInterviews.emit(interview);
    //   } else {
    //     this.outputChangeInterviews.emit(null);
    //     const dialogRef = this.dialog.open(AlertModalComponent, {
    //       data: <AlertDialogData> {
    //         title: 'Past dates are disabled!',
    //         message: 'You can\'t drop events on past dates.'
    //       }
    //     });
    //   }
    // } else {
    //   this.outputChangeInterviews.emit(null);
    // }
  }

  ngOnInit() {
    this.options = this.determineOptions();
  }
  clickButton(event) {
    console.log('click button', event);
  }
  getCalendarEvents() {
    if (this.inteviews) {
      this.calendarEventList = this.interviewWorker.convertInterviewListToEventList(this.inteviews);
      if (this.ucCalendar) {
      }
      console.log('calendarEventList', this.calendarEventList);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCalendarEvents();
    this.options = this.determineOptions();
    // if (this.locale === 'ru') {
    //   newOptions.buttonText = {
    //     month:    'Месяц',
    //     // today:    '>',
    //     week:     'Неделя',
    //     day:      'Лист',
    //     list:     'Список'
    //   };
    // } else {
    //   newOptions.buttonText = {
    //     month:    'Month',
    //     // today:    'Today',
    //     week:     'Week',
    //     day:      'Day',
    //     list:     'List'
    //   };
    // }
    // this.options = newOptions;
  }



}
