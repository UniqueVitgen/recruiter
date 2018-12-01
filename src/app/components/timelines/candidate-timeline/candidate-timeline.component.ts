import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../../classes/candidate';
import {Events} from '../../../classes/events';

@Component({
  selector: 'app-candidate-timeline',
  templateUrl: './candidate-timeline.component.html',
  styleUrls: ['./candidate-timeline.component.scss']
})
export class CandidateTimelineComponent implements OnInit {
  @Input() candidate: Candidate;
  arr: Array<Events> = [{event: 'interview', date: Date.now()},
    {event: 'note', date: Date.now()},
    {event: 'attachment', date: Date.now()},
    {event: 'attachment', date: Date.now()}git add .];

  constructor() { }

  ngOnInit() {
  }

}
