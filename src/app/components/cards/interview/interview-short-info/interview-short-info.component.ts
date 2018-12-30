import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterviewExtended} from '../../../../classes/interview';
import {CandidateWorker} from '../../../../workers/candidate/candidate.worker';
import {UserWorker} from '../../../../workers/user/user.worker';

@Component({
  selector: 'app-interview-short-info',
  templateUrl: './interview-short-info.component.html',
  styleUrls: ['./interview-short-info.component.scss']
})
export class InterviewShortInfoComponent implements OnInit {
  @Input() interview: InterviewExtended;
  @Input() buttonEdit: boolean;
  @Output('clickEdit') outputClickEdit: EventEmitter<InterviewExtended> = new EventEmitter();

  constructor(public userWorker: UserWorker) { }

  ngOnInit() {
  }
  clickEdit(): void {
    this.outputClickEdit.emit(this.interview);
  }

}
