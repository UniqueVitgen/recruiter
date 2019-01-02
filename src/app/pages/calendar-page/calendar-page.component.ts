import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {InterviewService} from '../../services/interview/interview.service';
import {Interview, InterviewExtended} from '../../classes/interview';
import {TranslateWorker} from '../../workers/translate/translate.worker';
import {InterviewCalendarEvent} from '../../classes/event/interview-calendar-event';
import {InterviewModalComponent} from '../../components/modals/interview/interview-modal/interview-modal.component';
import {InterviewDialogDataInterface} from '../../interfaces/dialog/init/interview-dialog-data-interface';
import {AlertModalComponent} from '../../components/modals/alert-modal/alert-modal.component';
import {AlertDialogData} from '../../interfaces/dialog/init/alert-dialog-data';
import {DateTimeWorker} from '../../workers/date-time/date-time.worker';
import {MatDialog} from '@angular/material';
import {BaseDialogResult} from '../../interfaces/dialog/result/base-dialog-result';
import {Subscription} from 'rxjs';
import Base = moment.unitOfTime.Base;
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.scss']
})
export class CalendarPageComponent implements OnInit {
  interviews: InterviewExtended[];
  lang: string;
  constructor(private interviewService: InterviewService,
              private dateTimeWorker: DateTimeWorker,
              private dialog: MatDialog,
              public router: Router,
              public translateWorker: TranslateWorker) {}
  ngOnInit(): void {
    this.getInterviews();
    this.lang = this.translateWorker.getLanguage();
    this.translateWorker.changeValue.subscribe(res => {
      console.log(res.lang);
      this.lang = res.lang;
    });
  }

  getInterviews(): Subscription {
    console.log('getInterviews');
    return this.interviewService.getAll().subscribe(resInterviews => {
      this.interviews = resInterviews;
    });
  }
  addInterview(event: InterviewCalendarEvent) {
    const todayStart: Date = this.dateTimeWorker.getTodayStart();
    if (event.targetDate.getTime() > todayStart.getTime()) {
      const dialogRef = this.dialog.open(InterviewModalComponent, {
        data: <InterviewDialogDataInterface> {
          sourceDate: event.targetDate,
          fixedCandidate: false,
          isEdit: false
        }
      });
      dialogRef.componentInstance.outputClickSave.subscribe((resInterview: BaseDialogResult<InterviewExtended>) => {
        this.interviewService.add(resInterview.resObject).subscribe(res => {
          this.getInterviews().add(() => {
            dialogRef.close();
          });
        });
      });
    } else {
      const dialogRef = this.dialog.open(AlertModalComponent, {
        data: <AlertDialogData> {
          title: this.translateWorker.translateWord('Past dates are disabled!'),
          message: this.translateWorker.translateWord('You can\'t add events on Past dates.')
        }
      });
    }
  }
  changeInterview(event: InterviewCalendarEvent) {
    console.log('event', event);
    this.router.navigate(['interview', event.interview.id]);
  }
  dropEvent(event: InterviewCalendarEvent) {

      const startTime: Date = event.targetDate;
      if (startTime.getTime() > this.dateTimeWorker.getTodayStart().getTime()) {
        const interview: InterviewExtended  = event.interview;
        // interview.planDate = this.dateTimeWorker.setUTCDate(startTime.getFullYear(),
        //   startTime.getMonth(), startTime.getDate(), startTime.getHours(),
        //   startTime.getMinutes()).toISOString();
        interview.planDate = startTime.toISOString();
        this.interviewService.update(interview).subscribe(res => {
          this.getInterviews();
        });
      } else {
        const dialogRef = this.dialog.open(AlertModalComponent, {
          data: <AlertDialogData> {
            title: 'Past dates are disabled!',
            message: 'You can\'t drop events on past dates.'
          }
        });
      }
  }
}
