import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Interview, InterviewExtended} from '../../../../classes/interview';
import {DevFeedback} from '../../../../classes/dev-feedback';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-interview-feedback',
  templateUrl: './interview-feedback.component.html',
  styleUrls: ['./interview-feedback.component.scss']
})
export class InterviewFeedbackComponent implements OnInit, OnChanges {
  @Input() isEdit: boolean;
  @Input() feedback: DevFeedback;
  @Input() buttonEdit: boolean;
  @Output('focusoutAnyInput') outputOnFocusoutAnyInput: EventEmitter<DevFeedback> = new EventEmitter();
  @Output('saveClick') outputSaveClick: EventEmitter<DevFeedback> = new EventEmitter();
  @Output('clickDelete') outputClickDelete: EventEmitter<DevFeedback> = new EventEmitter();
  // public feedbackForm: FormGroup;

  constructor(private fb: FormBuilder) { }

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

  ngOnChanges(changes: SimpleChanges): void {
    // if (this.feedback) {
    //   this.feedbackForm = this.fb.group({
    //   });
    //
    // }
  }

}
