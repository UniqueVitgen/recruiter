import {Component, Input, OnInit} from '@angular/core';
import {Interview, InterviewExtended} from '../../../../classes/interview';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.scss']
})
export class InterviewFeedbackComponent implements OnInit {
  @Input() interview: InterviewExtended;

  constructor() { }

  ngOnInit() {
  }

}
