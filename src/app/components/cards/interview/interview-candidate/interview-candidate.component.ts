import {Component, Input, OnInit} from '@angular/core';
import {InterviewExtended} from '../../../../classes/interview';

@Component({
  selector: 'app-interview-candidate',
  templateUrl: './interview-candidate.component.html',
  styleUrls: ['./interview-candidate.component.scss']
})
export class InterviewCandidateComponent implements OnInit {
  @Input() interview: InterviewExtended;

  constructor() { }

  ngOnInit() {
  }

}
