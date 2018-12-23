import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
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


@Component({
  selector: 'app-interview-calendar',
  templateUrl: './interview-calendar.component.html',
  styleUrls: ['./interview-calendar.component.scss']
})
export class InterviewCalendarComponent implements OnInit, OnChanges {
  // private mockVacancy: Vacancy = {
  //   id: 0,
  //   position: 'string',
  //   salaryInDollarsFrom: 1.1,
  //   salaryInDollarsTo: 1.1,
  //   vacancyState: VacancyState.OPEN,
  //   experienceYearsRequire: 1.1,
  //   developerId: 0,
  //   skills: [
  //     {
  //       name: 'string'
  //     }
  //   ],
  //   requirements: [
  //     {
  //       name: 'string',
  //       public: true,
  //       required: false
  //     }
  //   ]
  // };
  // private mockCandidate: Candidate = {
  //   id: 0,
  //   name: 'string',
  //   surname: 'string',
  //   birthday: '2015-07-20',
  //   salaryInDollars: 1.1,
  //   candidateState: {
  //     name: 'string'
  //   },
  //   skills: [
  //     {
  //       name: 'string'
  //     }
  //   ],
  //   experiences: [
  //     {
  //       dateFrom: '2015-07-20',
  //       dateTo: '2015-07-20',
  //       jobDescription: {
  //         id: 0,
  //         name: 'string'
  //       },
  //       jobPosition: 'string',
  //       companyName: {
  //         id: 0,
  //         name: 'string'
  //       }
  //     }
  //   ],
  //   contacts: [
  //     {
  //       contactType: ContactType.EMAIL,
  //       contactDetails: 'string'
  //     }
  //   ],
  //   attachments: [
  //     {
  //       attachmentType: AttachmentType.CV,
  //       filePath: 'string'
  //     }
  //   ],
  //   responsibilities: [
  //     {
  //       name: 'string'
  //     }
  //   ]
  // };
  // private mockInterview: InterviewExtended;
  // MONTH = 'Month';
  // WEEK = 'Week';
  // daysArray;
  // title = 'Interview Calendar';
  // date: Moment = moment();
  // // daysOfWeekArray = this.createWeekCalendar(this.date);
  // timesArray =  Array.apply(null, {length: 7 * 24});
  // selected: string;
  // appointmentsData = [];
  @Input() inteviews: InterviewExtended[];
  @Input() locale: string;
  @Output('changeInterviews') outputChangeInterviews: EventEmitter<any> = new EventEmitter();
  public calendarEventList: CalendarEvent[];
  public calendarOptions: Options = {
    editable: true,
    eventLimit: false,
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listMonth'
    }
  };
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private dialog: MatDialog,
              private vacancyService: VacancyService,
              private candidateService: CandidateService,
              public dateTimeWorker: DateTimeWorker,
              private interviewWorker: InterviewWorker,
              public translateWorker: TranslateWorker,
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
  addInterview(event: CustomEvent) {
    console.log('add interview', event);
    console.log('event.detail.date', event.detail.date.toDate());
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
      const interview = event.detail.event.interview;
      interview.planDate = startTime;
      this.outputChangeInterviews.emit(interview);
    } else {
      this.outputChangeInterviews.emit(null);
    }
  }

  ngOnInit() {
    const dateObj = new Date();
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
      console.log('calendarEventList', this.calendarEventList);
      // this.calendarOptions.events = this.calendarEventList;sole.log(this.calendarEventList);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('res', this.locale);
    this.calendarOptions.locale = this.locale;
    console.log('res', this.locale);
    if (this.locale === 'ru') {
      this.calendarOptions = {
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        },
        locale: this.locale
      };
    } else if (this.locale === 'en') {

      this.calendarOptions = {
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listMonth'
        }, locale: this.locale
      };
    }
    this.getCalendarEvents();
  }



}
