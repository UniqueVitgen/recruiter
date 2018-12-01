import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/classes/candidate';
import {UserWorker} from '../../../../workers/user/user.worker';

@Component({
  selector: 'app-candidate-dashboard-item',
  templateUrl: './candidate-dashboard-item.component.html',
  styleUrls: ['./candidate-dashboard-item.component.scss']
})
export class CandidateDashboardItemComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor(
    private router: Router,
    public userWorker: UserWorker) { }

  ngOnInit() {
  }

  deleteCandidate() {
  }

  goToCandidatePage() {
    this.router.navigate(['candidate', this.candidate.id]);
  }

}
