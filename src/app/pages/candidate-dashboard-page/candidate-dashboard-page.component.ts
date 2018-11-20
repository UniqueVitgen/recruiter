import { Component, OnInit } from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';

@Component({
  selector: 'app-candidate-dashboard-page',
  templateUrl: './candidate-dashboard-page.component.html',
  styleUrls: ['./candidate-dashboard-page.component.scss']
})
export class CandidateDashboardPageComponent implements OnInit {
  candidates: Candidate[];

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.candidateService.getAll().subscribe(res => {
      this.candidates = res;
    });
  }

}
