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
  @Input() isDeleteIcon: boolean;
  @Input() isStatus: boolean;
  @Input() isMoreIcon: boolean;
  @Input() isSelect: boolean;
  @Input() isCheck: boolean;
  @Output() clickEditIcon: EventEmitter<any> = new EventEmitter();
  @Output('clickDeleteIcon') outputClickDeleteIcon: EventEmitter<any> = new EventEmitter();
  @Output('clickCloseIcon') outputClickCloseIcon: EventEmitter<any> = new EventEmitter();
  @Output('clickRemoveFromBaseIcon') outputClickRemoveFromBaseIcon: EventEmitter<any> = new EventEmitter();
  @Output('clickAvatar') outputClickAvatar: EventEmitter<any> = new EventEmitter();
  checkBoxValue: boolean;
  @Input()
  get checkBox() {
    return this.checkBoxValue;
  }
  @Output() checkBoxChange: EventEmitter<any> =  new EventEmitter();

  set checkBox(value) {
    console.log('select23', value)
    this.checkBoxValue = value;
    this.checkBoxChange.emit(this.checkBoxValue);
  }
  
  constructor(public userWorker: UserWorker) { }

  ngOnInit() {
  }

  clickEdit() {
    this.clickEditIcon.emit();
  }

  clickClose() {
    this.outputClickCloseIcon.emit();
  }
  clickDelete() {
    this.outputClickDeleteIcon.emit();
  }
  clickRemoveFromBase() {
    this.outputClickRemoveFromBaseIcon.emit();
  }
  clickAvatar() {
    this.outputClickAvatar.emit();
  }

  changeValue(value: boolean) {
    console.log('select2', value)
    if (value) {
      this.checkBoxValue = false;
    } else {
      this.checkBoxValue = true;    }

  }
}
