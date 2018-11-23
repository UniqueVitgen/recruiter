import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {MatDialog} from '@angular/material';
import {InterviewModalComponent} from '../../modals/interview-modal/interview-modal.component';
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
        name: 'string'
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
  daysArray;
  title = 'Interview Calendar';
  date: Moment = moment();
  constructor(private dialog: MatDialog,
              private vacancyService: VacancyService,
              private candidateService: CandidateService,
              public dateTimeWorker: DateTimeWorker,
              private interviewService: InterviewService) {}
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
    });
    this.currentMonth();
  }

  openInterviewDialog(day, interview: InterviewExtended): void {
    const dialogRef = this.dialog.open(InterviewModalComponent, {
      minWidth: '400px',
        data: {
          day: day,
          interview: interview
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }
  createCalendar(month: Moment) {
    const firstDay = moment(month).startOf('M');
    const days = Array.apply(null, {length: month.daysInMonth()})
      .map(Number.call, Number)
      .map(n => {
        return {
          day: moment(firstDay).add(n, 'd').format('DD'),
          mockInterview: this.mockInterview
            // ['14:00-16:00 - Bobo']
        };
      });
    return days;
  }
  currentMonth() {
    this.date = this.date.add(0, 'month');
    this.daysArray = this.createCalendar(this.date);
  }
  prevMonth() {
    this.date = this.date.add(-1, 'month');
    this.daysArray = this.createCalendar(this.date);
  }
  nextMonth() {
    this.date = this.date.add(1, 'month');
    this.daysArray = this.createCalendar(this.date);
  }

}
