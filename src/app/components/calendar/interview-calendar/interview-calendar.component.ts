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
// import {EventObject, ViewObject} from 'fullcalendar';
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
  @Output('resizeEvent') outputResizeEvent: EventEmitter<InterviewCalendarEvent> = new EventEmitter();
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
    const that = this;
    let buttonText, firstDay, titleFormat;
    if (this.locale === 'ru') {
      buttonText = {
        month:    'Месяц',
        // today:    '>',
        week:     'Неделя',
        day:      'Лист',
        list:     'Список'
      };
      firstDay = 1;
      titleFormat = 'MMM YYYY';
    } else {
      buttonText = {
        month:    'Month',
        // today:    'Today',
        week:     'Week',
        day:      'Day',
        list:     'List'
      };
      firstDay = 0;
      titleFormat = 'MMM YYYY';
    }
    return {
      allDaySlot: false,
      allDayDefault: false,
      minTime: <any> '08:00:00',
      maxTime: <any> '23:00:00',
      locale: this.locale,
      // titleFormat: 'MMM YYYY',
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
      ,
      eventResize(event, jsEvent: MouseEvent, ui: any, view): void {
        that.resizeEvent(event);
      }
    };
  }
  }
  addInterview(event) {
    console.log('add interview', event);
    console.log('event.detail.date', event.date);
    const dateEvent: Date =  event.date;
    dateEvent.setHours(12);
    this.outputClickDay.emit({
      targetDate: dateEvent
    });
  }
  clickInterview(event) {
    this.outputClickEvent.emit({
      targetDate: event.event.extendedProps.interview.planDate,
      interview: event.event.extendedProps.interview
    });
    console.log('change event', event);
  }
  goToInterviewPage(event) {
    const interview = event.event.extendedProps.interview;
    this.router.navigate(['interview', interview.id]);
  }
  dropInterview(event) {
    console.log('drop Interview', event);
    this.outputDropEvent.emit({
      targetDate: event.event.start,
      targetEndDate: event.event.end,
      interview: event.event.def.extendedProps.interview
    });
  }
  resizeEvent(event) {
    console.log('resize Interview', event);
    this.outputResizeEvent.emit({
      targetDate: event.event.start,
      targetEndDate: event.event.end,
      interview: event.event.def.extendedProps.interview
    });
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
  }



}
