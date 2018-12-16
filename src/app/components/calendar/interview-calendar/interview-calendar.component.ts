import {Component, HostListener, OnChanges, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-interview-calendar',
  templateUrl: './interview-calendar.component.html',
  styleUrls: ['./interview-calendar.component.scss']
})
export class InterviewCalendarComponent implements OnInit {
  private mockVacancy: Vacancy = {
    id: 0,
    position: 'string',
    salaryInDollarsFrom: 1.1,
    salaryInDollarsTo: 1.1,
    vacancyState: VacancyState.OPEN,
    experienceYearsRequire: 1.1,
    developerId: 0,
    skills: [
      {
        name: 'string'
      }
    ],
    requirements: [
      {
        name: 'string',
        public: true,
        required: false
      }
    ]
  };
  private mockCandidate: Candidate = {
    id: 0,
    name: 'string',
    surname: 'string',
    birthday: '2015-07-20',
    salaryInDollars: 1.1,
    candidateState: {
      name: 'string'
    },
    skills: [
      {
        name: 'string'
      }
    ],
    experiences: [
      {
        dateFrom: '2015-07-20',
        dateTo: '2015-07-20',
        jobDescription: {
          id: 0,
          name: 'string'
        },
        jobPosition: 'string',
        companyName: {
          id: 0,
          name: 'string'
        }
      }
    ],
    contacts: [
      {
        contactType: ContactType.EMAIL,
        contactDetails: 'string'
      }
    ],
    attachments: [
      {
        attachmentType: AttachmentType.CV,
        filePath: 'string'
      }
    ],
    responsibilities: [
      {
        name: 'string'
      }
    ]
  };
  private mockInterview: InterviewExtended;
  MONTH = 'Month';
  WEEK = 'Week';
  daysArray;
  title = 'Interview Calendar';
  date: Moment = moment();
  daysOfWeekArray = this.createWeekCalendar(this.date);
  timesArray =  Array.apply(null, {length: 7 * 24});
  selected: string;

  constructor(private dialog: MatDialog,
              private vacancyService: VacancyService,
              private candidateService: CandidateService,
              public dateTimeWorker: DateTimeWorker,
              private interviewService: InterviewService) {
    this.selected  = this.MONTH;
  }
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' ) {
      this.prevMonth();
    }
    if (event.key === 'ArrowRight' ) {
      this.nextMonth();
    }
  }

  ngOnInit() {
    // this.createCalendar(this.date);
    this.vacancyService.get(0).subscribe(vacancyRes => {
      this.mockVacancy = vacancyRes;
      this.candidateService.get(0).subscribe(candidateRes => {
        this.mockCandidate = candidateRes;
        this.interviewService.get(0).subscribe(res => {
          this.mockInterview = res;
          this.mockInterview.vacancy = this.mockVacancy;
          this.mockInterview.candidate = this.mockCandidate;
          console.log(this.mockInterview);
          this.currentMonth();
        });
      });
    })
    this.selected  = this.MONTH;
    this.currentMonth();
  }
  openInterviewDialog(day: String, interview: InterviewExtended, date: Moment): void {
    const checkDate: Moment = moment().add(-1, 'day');
    if (date >= checkDate) {
      const dialogRef = this.dialog.open(InterviewModalComponent, {
          minWidth: '400px',
          data: {
            day: day,
            interview: interview
          },
          disableClose: true
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        // this.animal = result;
      });
    }
  }
  createWeekCalendar(currentDay: Moment): Moment[] {
    const startOfWeek = moment(currentDay).startOf('isoWeek');
    const endOfWeek = moment(currentDay).endOf('isoWeek');
    const days = [];
    let dayOfWeek = startOfWeek;
    while (dayOfWeek <= endOfWeek) {
      // days.push(dayOfWeek.weekday() + '\n' + dayOfWeek.format('DD'));
      days.push({
        weekday: dayOfWeek.clone().format('dddd'),
        day: dayOfWeek.format('DD')
      });
      dayOfWeek = dayOfWeek.clone().add(1, 'd');
    }
  //  for(let i = 0; i < )
     /*for (const day in days) {
       console.log(day);
     }*/
    return days;
  }
  createCalendar(month: Moment): Moment[] {
    const firstDay: Moment = moment(month).startOf('M');
    const days: any = Array.apply(null, {length: month.daysInMonth()})
      .map(Number.call, Number)
      .map(n => {
        return {
          day: moment(firstDay).add(n, 'd').format('DD'),
          mockInterview: this.mockInterview,
          lastMonth: moment() > moment(firstDay).add(n + 1, 'd') ? true : false,
          disable: false,
          date: moment(firstDay).add(n, 'd')
          // ['14:00-16:00 - Bobo']
        };
      });
    const dayOfWeek: number = firstDay.isoWeekday();
    const lastDay: Moment = moment(month).add(-1, 'month').endOf('month');
    for (let i = 1; i < dayOfWeek; i++) {
      days.unshift(
        {
          day: lastDay.format('DD'),
          mockInterview: this.mockInterview,
          lastMonth: moment() > moment(firstDay).add(i + 1, 'd') ? true : false,
          disable: true,
          date: lastDay
        }
      );
      lastDay.add(-1, 'day');
    }
    const lastDayOfCurrentMonth = moment(month).endOf('month');
    const lastDayOfCurrentMonthWeekDay: number = lastDayOfCurrentMonth.isoWeekday();
    for (let i = lastDayOfCurrentMonthWeekDay; i < 7; i++) {
      lastDayOfCurrentMonth.add(1, 'day');
      days.push(
        {
          day: lastDayOfCurrentMonth.format('DD'),
          mockInterview: this.mockInterview,
          lastMonth: false,
          disable: true,
          date: lastDayOfCurrentMonth
        });
    }

    return days;
  }

  isToday(day: Moment): boolean {
    if (moment().diff(this.date, 'days') === 0 && moment().format('DD') === day.toString()) {
      return true;
    } else {
      return false;
    }
  }

  currentMonth(): void {
      this.date = this.date.add(0, 'month');
      this.daysArray = this.createCalendar(this.date);
  }
  prevMonth(): void {
    if (this.selected === this.MONTH) {
      this.date = this.date.add(-1, 'month');
      this.daysArray = this.createCalendar(this.date);
    } else {
      this.date = this.date.add(-7, 'day');
      this.daysOfWeekArray = this.createWeekCalendar(this.date);
    }
  }

  nextMonth(): void {
    if (this.selected === this.MONTH) {
      this.date = this.date.add(1, 'month');
      this.daysArray = this.createCalendar(this.date);
    } else {
      this.date = this.date.add(7, 'day');
      this.daysOfWeekArray = this.createWeekCalendar(this.date);
    }
  }

}
