import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {InterviewService} from '../../services/interview/interview.service';
import {Interview, InterviewExtended} from '../../classes/interview';


@Component({
  selector: 'app-root',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.scss']
})
export class CalendarPageComponent implements OnInit {
  interviews: InterviewExtended[];
  constructor(private interviewService: InterviewService) {}
  ngOnInit(): void {
    this.getInterviews();
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
