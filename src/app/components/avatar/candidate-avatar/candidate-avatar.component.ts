import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  } from 'events';
import {UserWorker} from '../../../workers/user/user.worker';
import {Candidate} from '../../../classes/candidate';

@Component({
  selector: 'app-candidate-avatar',
  templateUrl: './candidate-avatar.component.html',
  styleUrls: ['./candidate-avatar.component.scss']
})
export class CandidateAvatarComponent implements OnInit {
  @Input() haveHoverEffect: boolean;
  @Input() candidate: Candidate;
  @Input() src: string;
  @Input() isEditedIcon: boolean;
  @Input() isClosedIcon: boolean;
  @Input() isMoreIcon: boolean;
  @Output() clickEditIcon: EventEmitter<any> = new EventEmitter();
  @Output() clickCloseIcon: EventEmitter<any> = new EventEmitter();
  @Output('clickAvatar') outputClickAvatar: EventEmitter<any> = new EventEmitter();

  constructor(public userWorker: UserWorker) { }

  ngOnInit() {
  }

  clickEdit() {
    this.clickEditIcon.emit();
  }

  clickClose() {
    this.clickCloseIcon.emit();
  }

  clickAvatar() {
    this.outputClickAvatar.emit();
  }

}
