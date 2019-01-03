import {Component, OnChanges, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {Candidate} from 'src/app/classes/candidate';
import {UserWorker} from '../../../../workers/user/user.worker';
import {CandidateService} from '../../../../services/candidate/candidate.service';
import {Attachment} from '../../../../classes/attachment';
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';

@Component({
  selector: 'app-candidate-dashboard-item',
  templateUrl: './candidate-dashboard-item.component.html',
  styleUrls: ['./candidate-dashboard-item.component.scss']
})
export class CandidateDashboardItemComponent implements OnChanges {
  @Output('deleteCandidate') outputDeleteCandidate: EventEmitter<Candidate> = new EventEmitter();
  @Output('deleteCandidateFromTheBase') outputDeleteCandidateFromTheBase: EventEmitter<Candidate> = new EventEmitter();
  @Input() candidate: Candidate;
  @Input() haveHoverEffect: boolean;
  @Input() isClosedIcon: boolean;
  @Input() clickableCandidate: boolean;
  @Input() haveBoxShadow: boolean;
  public photo: Attachment;

  constructor(
    private router: Router,
    public userWorker: UserWorker,
    public candidateWorker: CandidateWorker,
    public candidateService: CandidateService) {
    // this.photo = this.candidateWorker.findPhoto(this.candidate);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.photo = this.candidateWorker.findPhoto(this.candidate);
  }


  deleteCandidate(): void {
    // this.candidateService.delete(this.candidate.id).subscribe(
    //   (res) => { console.log('id');
    console.log(this.candidate);
    this.outputDeleteCandidate.emit(this.candidate);
    // });
  }

  deleteCandidateFromTheBase(): void {
    console.log('deleteCandidateFromTheBase');
    this.outputDeleteCandidateFromTheBase.emit(this.candidate);
  }

  goToCandidatePage(): void {
    this.router.navigate(['candidate', this.candidate.id]);
  }

}
