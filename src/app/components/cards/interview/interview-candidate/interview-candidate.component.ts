import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterviewExtended} from '../../../../classes/interview';
import {Candidate} from '../../../../classes/candidate';

@Component({
  selector: 'app-interview-candidate',
  templateUrl: './interview-candidate.component.html',
  styleUrls: ['./interview-candidate.component.scss']
})
export class InterviewCandidateComponent implements OnInit {
  @Input() interview: InterviewExtended;
  @Input() haveHoverEffectOnAvatar: boolean;
  @Input() isEditIconOnAvatar: boolean;
  @Input() src: string;
  @Output('clickAvatar') outputClickAvatar: EventEmitter<Candidate> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  clickAvatar() {
    this.outputClickAvatar.emit(this.interview.candidate);
  }

}
