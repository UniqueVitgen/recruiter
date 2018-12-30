import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Interview, InterviewExtended} from '../../../../classes/interview';
import {DevFeedback} from '../../../../classes/dev-feedback';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.scss']
})
export class InterviewFeedbackComponent implements OnInit {
  @Input() isEdit: boolean;
  @Input() feedback: DevFeedback;
  @Input() buttonEdit: boolean;
  @Output('focusoutAnyInput') outputOnFocusoutAnyInput: EventEmitter<DevFeedback> = new EventEmitter();
  @Output('saveClick') outputSaveClick: EventEmitter<DevFeedback> = new EventEmitter();
  @Output('clickDelete') outputClickDelete: EventEmitter<DevFeedback> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  onFocusAnyInput() {
    if (this.isEdit) {
      this.outputOnFocusoutAnyInput.emit(this.feedback);
    }
  }
  saveFeedback() {
    this.outputSaveClick.emit(this.feedback);
  }
  clickDelete(): void {
    this.outputClickDelete.emit(this.feedback);
  }

}
