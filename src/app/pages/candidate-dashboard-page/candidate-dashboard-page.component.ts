import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Candidate } from 'src/app/classes/candidate';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import {SearchWorker} from '../../workers/search/search.worker';
import {CandidateWorker} from '../../workers/candidate/candidate.worker';
import {UserWorker} from '../../workers/user/user.worker';

@Component({
  selector: 'app-candidate-dashboard-page',
  templateUrl: './candidate-dashboard-page.component.html',
  styleUrls: ['./candidate-dashboard-page.component.scss']
})
export class CandidateDashboardPageComponent implements OnInit {
  candidates: Candidate[];
  selectedCandidates: Candidate[];
  mockCandidates: Candidate[];
  searchValue: string;

  constructor(private candidateService: CandidateService, private searchWorker: SearchWorker, private userWorker: UserWorker) { }

  ngOnInit() {
    this.getAll();
    // this.mockCandidates = this.candidateService.mockCandidates;
  }

  search(value: string) {
    this.searchValue = value;
  }

  getAll() {
    console.log('1');
    this.candidateService.getAll().subscribe(res => {
      console.log(res);
      this.candidates = res;
    }, err => {
      console.log('1' + err);
    });
  }

}
