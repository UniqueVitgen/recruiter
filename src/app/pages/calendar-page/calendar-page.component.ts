import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {InterviewService} from '../../services/interview/interview.service';
import {Interview, InterviewExtended} from '../../classes/interview';
import {TranslateWorker} from '../../workers/translate/translate.worker';


@Component({
  selector: 'app-root',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.scss']
})
export class CalendarPageComponent implements OnInit {
  interviews: InterviewExtended[];
  lang: string;
  constructor(private interviewService: InterviewService,
              public translateWorker: TranslateWorker) {}
  ngOnInit(): void {
    this.getInterviews();
    this.lang = this.translateWorker.getLanguage();
    this.translateWorker.changeValue.subscribe(res => {
      console.log(res.lang);
      this.lang = res.lang;
    });
  }

  getInterviews() {
    console.log('getInterviews');
    this.interviewService.getAll().subscribe(resInterviews => {
      this.interviews = resInterviews;
    });
  }
  changeInterviews(event: InterviewExtended) {
    console.log('event', event);
    if (event) {
      this.interviewService.update(event).subscribe(res => {
        this.getInterviews();
      });
    }
    else {
      this.getInterviews();
    }
  }
}
