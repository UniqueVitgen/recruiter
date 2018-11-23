import {Component, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {InterviewService} from '../../services/interview/interview.service';


@Component({
  selector: 'app-root',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.scss']
})
export class CalendarPageComponent implements OnInit {
  constructor(private interviewService: InterviewService) {}
  ngOnInit(): void {
    this.getInterviews();
  }

  getInterviews() {
    this.interviewService.getAll().subscribe(res => {
      console.log(res);
    });
  }
}
