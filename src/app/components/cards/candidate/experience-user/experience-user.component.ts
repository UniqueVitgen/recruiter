import {Component, Input, OnInit} from '@angular/core';
import {Candidate} from '../../../../classes/candidate';

@Component({
  selector: 'app-experience-user',
  templateUrl: './experience-user.component.html',
  styleUrls: ['./experience-user.component.scss']
})
export class ExperienceUserComponent implements OnInit {
  @Input() candidate: Candidate;
  constructor() { }

  ngOnInit() {
  }

}
