import {Component, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
  public calendarEventList: CalendarEvent[];
  public calendarOptions: Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;

  constructor(private dialog: MatDialog,
              private vacancyService: VacancyService,
              private candidateService: CandidateService,
              public dateTimeWorker: DateTimeWorker,
              private interviewWorker: InterviewWorker,
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
  addInterview() {
    this.dialog.open(InterviewModalComponent, {
      data: <InterviewDialogData> {
        fixedCandidate: false,
        isEdit: false
      }
    });
  }

  ngOnInit() {
    const dateObj = new Date();
    this.calendarOptions = {
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      }
      ,
      events: [{
        title: 'All Day Event',
        start: dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1) +  '-09T16:00:00',
        end: dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1) +  '-09T19:00:00'
      }
      ]
    };
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.inteviews) {
      this.calendarEventList = this.interviewWorker.convertInterviewListToEventList(this.inteviews);
      this.calendarOptions.events = this.calendarEventList;
      console.log(this.calendarEventList);
    }
  }



}
