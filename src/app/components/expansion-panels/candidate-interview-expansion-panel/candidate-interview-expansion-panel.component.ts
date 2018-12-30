import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InterviewExtended} from '../../../classes/interview';
import {Candidate} from '../../../classes/candidate';

@Component({
  selector: 'app-candidate-interview-expansion-panel',
  templateUrl: './candidate-interview-expansion-panel.component.html',
  styleUrls: ['./candidate-interview-expansion-panel.component.scss']
})
export class CandidateInterviewExpansionPanelComponent implements OnInit {
  @Input() candidate: Candidate;
  @Input() haveHoverEffectOnAvatar: boolean;
  @Input() isEditIconOnAvatar: boolean;
  @Input() src: string;
  @Output('clickAvatar') outputClickAvatar: EventEmitter<Candidate> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  clickAvatar() {
    this.outputClickAvatar.emit(this.candidate);
  }

}
