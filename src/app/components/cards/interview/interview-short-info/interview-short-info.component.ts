import {Component, Input, OnInit} from '@angular/core';
import {InterviewExtended} from '../../../../classes/interview';

@Component({
  selector: 'app-interview-short-info',
  templateUrl: './interview-short-info.component.html',
  styleUrls: ['./interview-short-info.component.scss']
})
export class InterviewShortInfoComponent implements OnInit {
  @Input() interview: InterviewExtended;

  constructor() { }

  ngOnInit() {
  }

}
