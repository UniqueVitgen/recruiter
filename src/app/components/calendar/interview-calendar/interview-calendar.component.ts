import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {Duration, Moment} from 'moment';
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
import { Options } from 'fullcalendar';
import {CalendarEvent} from '../../../classes/html/calendar/calendar-event';
import {InterviewWorker} from '../../../workers/interview/interview.worker';
import {InterviewDialogData} from '../../../interfaces/dialog/init/interview-dialog-data';
import {TranslateWorker} from '../../../workers/translate/translate.worker';
import {AlertModalComponent} from '../../modals/alert-modal/alert-modal.component';
import {AlertDialogData} from '../../../interfaces/dialog/init/alert-dialog-data';


@Component({
  selector: 'app-interview-calendar',
  templateUrl: './interview-calendar.component.html',
  styleUrls: ['./interview-calendar.component.scss']
})
export class InterviewCalendarComponent implements OnInit, OnChanges {
  @Input() inteviews: InterviewExtended[];
  @Input() locale: string;
  @Output('changeInterviews') outputChangeInterviews: EventEmitter<any> = new EventEmitter();
  public calendarEventList: CalendarEvent[];
  public calendarOptionsRU: Options = {
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
    },
    buttonText: {
      prev: 'Предыдущий',
      next: 'Следующий',
      today: 'Сегодня',
      month: 'Месяц',
      week: 'Неделя',
      day: 'День',
      list: 'Список'
    },
    monthNames:['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
      'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда',
      'Четверг', 'Пятница', 'Суббота'],
    dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР',
      'ЧТ', 'ПТ', 'СБ']
  };
  public calendarOptionsEN: Options = {
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
  // public calendarOptions2: Options = {buttonText: {
  //     // prev: 'Предыдущий',
  //     // next: 'Следующий',
  //     today: 'Сегодня',
  //     month: 'Месяц',
  //     week: 'Неделя',
  //     day: 'День',
  //     list: 'Список'
  //   },
  //   allDaySlot: false,
  //   allDayDefault: false,
  //   editable: true,
  //   eventLimit: false,
  //   minTime: moment.duration('08:00:00'),
  //   header: {
  //     left: 'prev,next today',
  //     center: 'title',
  //     right: 'month,agendaWeek,agendaDay,listMonth'
  //   }};
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private dialog: MatDialog,
              private vacancyService: VacancyService,
              private candidateService: CandidateService,
              public dateTimeWorker: DateTimeWorker,
              private interviewWorker: InterviewWorker,
              public translateWorker: TranslateWorker,
              private interviewService: InterviewService) {
    console.log('now', moment.duration('08:00:00'));
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
  addInterview(event: CustomEvent) {
    console.log('add interview', event);
    console.log('event.detail.date', event.detail.date.toDate());
    const dateEvent =  event.detail.date.toDate();
    const todayStart = this.dateTimeWorker.getTodayStart();
    if (dateEvent.getTime() > todayStart.getTime()) {
      const dialogRef = this.dialog.open(InterviewModalComponent, {
        data: <InterviewDialogData> {
          sourceDate: event.detail.date.toDate(),
          fixedCandidate: false,
          isEdit: false
        }
      });
      dialogRef.afterClosed().subscribe(res => {
        this.outputChangeInterviews.emit(null);
      });
    } else {
      const dialogRef = this.dialog.open(AlertModalComponent, {
        data: <AlertDialogData> {
          title: 'Previous dates are disabled!',
          message: 'You can\'t add events on previous dates.'
        }
      });
    }
  }
  changeInterview(event) {
    console.log('change event', event);
    const dialogRef = this.dialog.open(InterviewModalComponent, {
      data: <InterviewDialogData> {
        sourceDate: event.detail.event.interview.planDate,
        fixedCandidate: false,
        isEdit: true,
        sourceInterview: event.detail.event.interview
      }
    });
    dialogRef.afterClosed().subscribe(res => {
      this.outputChangeInterviews.emit(null);
    });
  }
  dropInterview(event) {
    console.log('drop Interview', event);
    if (event) {
      const startTime = new Date(event.detail.event.start._d);
      if (startTime.getTime() > this.dateTimeWorker.getTodayStart().getTime()) {
        const interview = event.detail.event.interview;
        interview.planDate = startTime;
        this.outputChangeInterviews.emit(interview);
      } else {
        this.outputChangeInterviews.emit(null);
        const dialogRef = this.dialog.open(AlertModalComponent, {
          data: <AlertDialogData> {
            title: 'Previous dates are disabled!',
            message: 'You can\'t drop events on previous dates.'
          }
        });
      }
    } else {
      this.outputChangeInterviews.emit(null);
    }
  }

  ngOnInit() {
    const dateObj = new Date();
    console.log('now', dateObj);
    // this.l = this.translateWorker.getLanguage();
    // this.translateWorker.changeValue.subscribe(res => {
    //   console.log(res.lang);
    //   this.lang = res.lang;
    // });
    // this.calendarOptions = {
    //   editable: true,
    //   eventLimit: false,
    //   header: {
    //     left: 'prev,next today',
    //     center: 'title',
    //     right: 'month,agendaWeek,agendaDay,listMonth'
    //   },
    //   locale: 'ru'
    // };
    // this.createCalendar(this.date);
    // this.vacancyService.get(0).subscribe(vacancyRes => {
    //   this.mockVacancy = vacancyRes;
    //   this.candidateService.get(0).subscribe(candidateRes => {
    //     this.mockCandidate = candidateRes;
    //     this.interviewService.get(0).subscribe(res => {
    //       this.mockInterview = res;
    //       this.mockInterview.vacancy = this.mockVacancy;
    //       this.mockInterview.candidate = this.mockCandidate;
    //       console.log(this.mockInterview);
    //       // this.currentMonth();
    //     });
    //   });
    // });
    // this.selected  = this.MONTH;
  }
  clickButton(event) {
    console.log('click button', event);
  }
  getCalendarEvents() {
    if (this.inteviews) {
      this.calendarEventList = this.interviewWorker.convertInterviewListToEventList(this.inteviews);
      this.ucCalendar.fullCalendar('rerenderEvents');
      console.log('calendarEventList', this.calendarEventList);
      // this.calendarOptions.events = this.calendarEventList;sole.log(this.calendarEventList);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('res locale', this.locale);
    // this.calendarOptions.locale = this.locale;
    // if (this.locale === 'ru') {
    //   this.calendarOptions.buttonText = {
    //       // prev: 'Предыдущий',
    //       // next: 'Следующий',
    //       today: 'Сегодня',
    //       month: 'Месяц',
    //       week: 'Неделя',
    //       day: 'День',
    //       list: 'Список'
    //   };
    //   this.calendarOptions =  { buttonText: {
    //     // prev: 'Предыдущий',
    //     // next: 'Следующий',
    //     today: 'Сегодня',
    //     month: 'Месяц',
    //     week: 'Неделя',
    //     day: 'День',
    //     list: 'Список'
    //   },
    //     allDaySlot: false,
    //     allDayDefault: false,
    //     editable: true,
    //     eventLimit: false,
    //     header: {
    //       left: 'prev,next today',
    //       center: 'title',
    //       right: 'month,agendaWeek,agendaDay,listMonth'
    //     }};
    // } else if (this.locale === 'en') {
    //   this.calendarOptions.buttonText = {
    //     // prev: 'Prev',
    //     // next: 'Next',
    //     today: 'Today',
    //     month: 'Month',
    //     week: 'Week',
    //     day: 'Day',
    //     list: 'List'
    //   };
    //   this.calendarOptions = {
    //     buttonText: {
    //       // prev: 'Предыдущий',
    //       // next: 'Следующий',
    //       today: 'Today',
    //       month: 'Month',
    //       week: 'Week',
    //       day: 'Day',
    //       list: 'List'
    //     },
    //     allDaySlot: false,
    //     allDayDefault: false,
    //     editable: true,
    //     eventLimit: false,
    //     header: {
    //       left: 'prev,next today',
    //       center: 'title',
    //       right: 'month,agendaWeek,agendaDay,listMonth'
    //     }
    //   };
    // }
    //   this.calendarOptions.locale = this.locale;
    // // this.ucCalendar.ngOnInit();
    // this.ucCalendar.updaterOptions();
      console.log('res alendarOptions', this.calendarOptions);
    this.getCalendarEvents();
  }



}
