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
  mockCandidates: Candidate[];

  constructor(private candidateService: CandidateService) { }

  ngOnInit() {
    this.getAll();
    this.candidateService.getTest().subscribe(res => {
      console.log('res', res);
    });
    // this.mockCandidates = this.candidateService.mockCandidates;
  }

  getAll() {
    this.candidateService.getAll().subscribe(res => {
      console.log(res);
      this.candidates = res;
    }, err => {
      console.log('1' + err);
    });
  }

}
