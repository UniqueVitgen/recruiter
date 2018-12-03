import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Candidate } from 'src/app/classes/candidate';
import {UserWorker} from '../../../../workers/user/user.worker';
import {CandidateService} from '../../../../services/candidate/candidate.service';

@Component({
  selector: 'app-candidate-dashboard-item',
  templateUrl: './candidate-dashboard-item.component.html',
  styleUrls: ['./candidate-dashboard-item.component.scss']
})
export class CandidateDashboardItemComponent implements OnInit {
  @Input() candidate: Candidate;
  id: number;
  flag: boolean;

  constructor(
    private router: Router,
    public userWorker: UserWorker,
    public candidateService: CandidateService) { }

  ngOnInit() {
  }

  deleteCandidate() {
    this.candidateService.delete(this.candidate.id).subscribe();
    window.location.reload();
    this.flag = true;
  }

  goToCandidatePage() {
    if (!this.flag) {
      this.router.navigate(['candidate', this.candidate.id]);
    }
  }

}
