import { Component, OnInit, Input } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';

@Component({
  selector: 'app-candidate-dashboard-item',
  templateUrl: './candidate-dashboard-item.component.html',
  styleUrls: ['./candidate-dashboard-item.component.scss']
})
export class CandidateDashboardItemComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor() { }

  ngOnInit() {
  }

}
