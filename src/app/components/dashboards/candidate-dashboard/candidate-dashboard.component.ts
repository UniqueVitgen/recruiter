import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';

@Component({
  selector: 'app-candidate-dashboard',
  templateUrl: './candidate-dashboard.component.html',
  styleUrls: ['./candidate-dashboard.component.scss']
})
export class CandidateDashboardComponent implements OnInit {
  @Input() candidates: Candidate[];
  @Input() haveAddElement: boolean;

  constructor() { }

  ngOnInit() {
  }

}
