import {Component, OnChanges, Input, Output, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Candidate } from 'src/app/classes/candidate';
import {UserWorker} from '../../../../workers/user/user.worker';
import {CandidateService} from '../../../../services/candidate/candidate.service';

@Component({
  selector: 'app-candidate-dashboard-item',
  templateUrl: './candidate-dashboard-item.component.html',
  styleUrls: ['./candidate-dashboard-item.component.scss']
})
export class CandidateDashboardItemComponent {
  @Output('deleteCandidate') outputDeleteCandidate: EventEmitter<any> = new EventEmitter();
  @Input() candidate: Candidate;

  constructor(
    private router: Router,
    public userWorker: UserWorker,
    public candidateService: CandidateService) { }


  deleteCandidate() {
    this.candidateService.delete(this.candidate.id).subscribe(
      (res) => { console.log('id');
        this.outputDeleteCandidate.emit(this.candidate);
      });
  }

  goToCandidatePage() {
    this.router.navigate(['candidate', this.candidate.id]);
  }

}
