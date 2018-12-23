import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {InterviewService} from '../../services/interview/interview.service';
import {InterviewExtended} from '../../classes/interview';


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
    this.interviewService.getAll().subscribe(resInterviews => {
      this.interviews = resInterviews;
    });
    // this.interviewService.getAll().subscribe(res => {
    //   console.log(res);
    // });
  }
}
