import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../../classes/candidate';

@Component({
  selector: 'app-candidate-timeline',
  templateUrl: './candidate-timeline.component.html',
  styleUrls: ['./candidate-timeline.component.scss']
})
export class CandidateTimelineComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit() {
  }

}
