import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/classes/candidate';

@Component({
  selector: 'app-candidate-dashboard-item',
  templateUrl: './candidate-dashboard-item.component.html',
  styleUrls: ['./candidate-dashboard-item.component.scss']
})
export class CandidateDashboardItemComponent implements OnInit {
  @Input() candidate: Candidate;

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  deleteCandidate() {
  }

  goToCandidatePage() {
    this.router.navigate(['candidate', this.candidate.id]);
  }

}
